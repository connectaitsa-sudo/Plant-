import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader, Bot, User, Mic, MicOff, Volume2, VolumeX, Globe, Sparkles } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  language: 'en' | 'ar'
}

const ModernChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! 👋 I\'m your AI Plant Expert. Ask me anything about plant care in English or Arabic! 🌿\n\nمرحبا! أنا خبير النباتات. اسألني أي شيء! 🌱',
      sender: 'bot',
      timestamp: new Date(),
      language: 'en'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [language, setLanguage] = useState<'en' | 'ar'>('en')
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  // Update recognition language
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language === 'ar' ? 'ar-SA' : 'en-US'
    }
  }, [language])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const speak = (text: string, lang: string) => {
    if (!soundEnabled) return
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices()
      const utterance = new SpeechSynthesisUtterance(text)
      
      // Set language-specific voice
      if (lang === 'ar') {
        const arabicVoice = voices.find(voice => 
          voice.lang.includes('ar') || 
          voice.lang.includes('ar-SA') ||
          voice.name.includes('Arabic')
        )
        if (arabicVoice) {
          utterance.voice = arabicVoice
        }
        utterance.lang = 'ar-SA'
      } else {
        const englishVoice = voices.find(voice => 
          voice.lang.includes('en-US') ||
          voice.lang.includes('en-GB')
        )
        if (englishVoice) {
          utterance.voice = englishVoice
        }
        utterance.lang = 'en-US'
      }
      
      utterance.rate = 0.95
      utterance.pitch = 1
      utterance.volume = 1
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      
      // Ensure voices are loaded
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.speak(utterance)
        }
      } else {
        window.speechSynthesis.speak(utterance)
      }
    }
  }

  const toggleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start()
        setIsListening(true)
      }
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      language
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    try {
      const systemPrompt = language === 'ar' 
        ? 'أنت خبير متخصص في رعاية النباتات وأمراضها. قدم نصائح دقيقة ومفيدة باللغة العربية فقط. كن ودودًا ومحترفًا.'
        : 'You are an expert botanist and plant care specialist. Provide accurate, helpful advice about plant diseases and care. Be friendly and professional. Answer in English only.'

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.slice(-8).map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            })),
            { role: 'user', content: inputMessage }
          ],
          max_tokens: 600,
          temperature: 0.7
        })
      })

      const data = await response.json()
      const botResponse = data.choices[0].message.content

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        language
      }

      setMessages(prev => [...prev, botMessage])
      
      // Auto-speak bot response
      setTimeout(() => speak(botResponse, language), 300)
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'ar' 
          ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى!' 
          : 'Sorry, something went wrong. Please try again!',
        sender: 'bot',
        timestamp: new Date(),
        language
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const changeLanguage = (newLang: 'en' | 'ar') => {
    setLanguage(newLang)
    setShowLanguageMenu(false)
    
    const langMessage: Message = {
      id: Date.now().toString(),
      text: newLang === 'ar' 
        ? 'تم تغيير اللغة إلى العربية! 🌿 كيف يمكنني مساعدتك في رعاية نباتاتك؟'
        : 'Language changed to English! 🌿 How can I help you with your plants?',
      sender: 'bot',
      timestamp: new Date(),
      language: newLang
    }
    setMessages(prev => [...prev, langMessage])
    speak(langMessage.text, newLang)
  }

  return (
    <>
      {/* Floating Button */}
      <motion.div 
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          data-chatbot-button
          className="relative group"
        >
          {/* Pulsing rings */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-emerald-500"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-emerald-500"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          
          {/* Main button */}
          <div className="relative w-20 h-20 bg-gradient-to-br from-primary-500 via-emerald-500 to-primary-600 rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: 0, scale: 0 }}
                  animate={{ rotate: 90, scale: 1 }}
                  exit={{ rotate: 0, scale: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <X className="w-9 h-9 text-white relative z-10" strokeWidth={3} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  <MessageCircle className="w-9 h-9 text-white relative z-10" strokeWidth={2.5} />
                  {isSpeaking && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                      <Volume2 className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-32 right-8 z-50 w-[440px] h-[700px] flex flex-col overflow-hidden rounded-3xl shadow-2xl border-2 border-primary-500/20"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-primary-500 via-emerald-500 to-primary-600 p-6 overflow-hidden">
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
                animate={{
                  backgroundPosition: ['0px 0px', '20px 20px'],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div 
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center relative overflow-hidden"
                    animate={{
                      boxShadow: ['0 0 20px rgba(255,255,255,0.3)', '0 0 40px rgba(255,255,255,0.6)', '0 0 20px rgba(255,255,255,0.3)']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-8 h-8 text-white absolute animate-pulse" />
                    <Bot className="w-8 h-8 text-white relative z-10" strokeWidth={2.5} />
                    {isSpeaking && (
                      <motion.div
                        className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-300 rounded-full"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <div>
                    <h3 className="text-white font-bold text-2xl flex items-center space-x-2 tracking-tight">
                      <span>Plant Expert</span>
                      {isListening && (
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          🎤
                        </motion.span>
                      )}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <motion.div 
                        className="w-2.5 h-2.5 bg-green-300 rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="text-white/95 text-sm font-medium">
                        {language === 'ar' ? 'متاح الآن • صوت ونص' : 'Online • Voice & Text'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Sound toggle */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all"
                  >
                    {soundEnabled ? (
                      <Volume2 className="w-5 h-5 text-white" />
                    ) : (
                      <VolumeX className="w-5 h-5 text-white" />
                    )}
                  </motion.button>
                  
                  {/* Language selector */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                      className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all"
                    >
                      <Globe className="w-5 h-5 text-white" />
                    </motion.button>
                    
                    <AnimatePresence>
                      {showLanguageMenu && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: -10 }}
                          className="absolute top-14 right-0 glass rounded-2xl p-3 min-w-[140px] border-2 border-white/20 shadow-xl"
                        >
                          <button
                            onClick={() => changeLanguage('en')}
                            className={`w-full px-4 py-3 rounded-xl text-left transition-all font-semibold ${
                              language === 'en' 
                                ? 'bg-gradient-to-r from-primary-500 to-emerald-500 text-white' 
                                : 'text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            🇬🇧 English
                          </button>
                          <button
                            onClick={() => changeLanguage('ar')}
                            className={`w-full px-4 py-3 rounded-xl text-left transition-all font-semibold mt-2 ${
                              language === 'ar' 
                                ? 'bg-gradient-to-r from-primary-500 to-emerald-500 text-white' 
                                : 'text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            🇸🇦 العربية
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div 
              className="flex-1 overflow-y-auto p-6 space-y-4" 
              dir={language === 'ar' ? 'rtl' : 'ltr'}
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))'
              }}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <motion.div 
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                          : 'bg-gradient-to-br from-primary-500 to-emerald-600'
                      }`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.4 }}
                    >
                      {message.sender === 'user' ? (
                        <User className="w-6 h-6 text-white" strokeWidth={2.5} />
                      ) : (
                        <Bot className="w-6 h-6 text-white" strokeWidth={2.5} />
                      )}
                    </motion.div>
                    <div className={`px-5 py-4 rounded-2xl shadow-lg backdrop-blur-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                        : 'bg-white/10 text-white border-2 border-primary-500/30'
                    }`}>
                      <p className="text-base leading-relaxed whitespace-pre-wrap font-medium">
                        {message.text}
                      </p>
                      <span className="text-xs opacity-70 mt-2 block font-medium">
                        {message.timestamp.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-500 to-emerald-600 flex items-center justify-center shadow-lg">
                      <Bot className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm px-5 py-4 rounded-2xl border-2 border-primary-500/30">
                      <div className="flex space-x-2">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                            className="w-2.5 h-2.5 bg-primary-400 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div 
              className="p-5 border-t-2 border-white/10"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.4))'
              }}
            >
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={language === 'ar' ? 'اسأل عن رعاية النباتات...' : 'Ask about plant care...'}
                    className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-all text-base font-medium"
                    disabled={isTyping || isListening}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                  {isListening && (
                    <motion.div
                      className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span className="text-red-400 text-sm font-semibold">Listening...</span>
                    </motion.div>
                  )}
                </div>
                
                {/* Voice Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleVoiceInput}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg ${
                    isListening 
                      ? 'bg-red-500 animate-pulse' 
                      : 'bg-gradient-to-br from-purple-500 to-pink-600'
                  }`}
                  disabled={isTyping}
                >
                  {isListening ? (
                    <MicOff className="w-6 h-6 text-white" strokeWidth={2.5} />
                  ) : (
                    <Mic className="w-6 h-6 text-white" strokeWidth={2.5} />
                  )}
                </motion.button>

                {/* Send Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isTyping || isListening}
                  className="w-14 h-14 bg-gradient-to-br from-primary-500 to-emerald-600 rounded-2xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-primary-500/50 transition-all"
                >
                  {isTyping ? (
                    <Loader className="w-6 h-6 text-white animate-spin" strokeWidth={2.5} />
                  ) : (
                    <Send className="w-6 h-6 text-white" strokeWidth={2.5} />
                  )}
                </motion.button>
              </div>
              
              <p className="text-xs text-gray-400 mt-3 text-center font-medium">
                {language === 'ar' 
                  ? '🎤 استخدم الصوت أو اكتب رسالتك • الذكاء الاصطناعي متاح' 
                  : '🎤 Use voice or type your message • AI powered'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ModernChatbot
