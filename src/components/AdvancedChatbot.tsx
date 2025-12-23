import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader, Bot, User, Mic, MicOff, Volume2, Globe } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  language: 'en' | 'ar'
}

const AdvancedChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! 👋 I\'m your AI Plant Care Assistant. I can help you in English or Arabic! كيف يمكنني مساعدتك؟',
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
      recognitionRef.current.lang = language === 'ar' ? 'ar-SA' : 'en-US'

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
  }, [language])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const speak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US'
      utterance.rate = 0.9
      utterance.pitch = 1
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      
      window.speechSynthesis.speak(utterance)
    }
  }

  const toggleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.lang = language === 'ar' ? 'ar-SA' : 'en-US'
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
        ? 'أنت خبير في رعاية النباتات. قدم نصائح دقيقة وودية حول أمراض النباتات والعناية بها. أجب باللغة العربية فقط.'
        : 'You are a helpful plant care expert and botanist. Provide friendly, accurate advice about plant diseases, care, and treatments. Keep responses concise but informative. Answer in English only.'

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
            ...messages.slice(-10).map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            })),
            { role: 'user', content: inputMessage }
          ],
          max_tokens: 500,
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
      speak(botResponse, language)
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'ar' ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى!' : 'Sorry, I encountered an error. Please try again!',
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
        ? 'تم تغيير اللغة إلى العربية! كيف يمكنني مساعدتك؟ 🌿'
        : 'Language changed to English! How can I help you? 🌿',
      sender: 'bot',
      timestamp: new Date(),
      language: newLang
    }
    setMessages(prev => [...prev, langMessage])
    speak(langMessage.text, newLang)
  }

  return (
    <>
      {/* Floating Chat Button with Pulse Animation */}
      <motion.div className="fixed bottom-8 right-8 z-50">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          data-chatbot-button
          className="relative w-20 h-20 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full shadow-2xl flex items-center justify-center hover:shadow-primary-500/50 transition-all glow-green"
        >
          {/* Pulse Ring Animation */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary-400"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: 0 }}
                animate={{ rotate: 90 }}
                exit={{ rotate: 0 }}
              >
                <X className="w-8 h-8 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative"
              >
                <MessageCircle className="w-8 h-8 text-white" />
                {isSpeaking && (
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <Volume2 className="w-4 h-4 text-yellow-300" />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-32 right-8 z-50 w-[400px] h-[650px] glass rounded-3xl shadow-2xl flex flex-col overflow-hidden border-2 border-primary-500/30"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-emerald-500 p-6 relative overflow-hidden">
              {/* Animated Background Pattern */}
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center relative"
                    animate={{
                      boxShadow: ['0 0 20px rgba(255,255,255,0.3)', '0 0 40px rgba(255,255,255,0.6)', '0 0 20px rgba(255,255,255,0.3)']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Bot className="w-7 h-7 text-white" />
                    {isSpeaking && (
                      <motion.div
                        className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <div>
                    <h3 className="text-white font-bold text-xl flex items-center space-x-2">
                      <span>AI Plant Assistant</span>
                      {isListening && (
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          🎤
                        </motion.span>
                      )}
                    </h3>
                    <p className="text-white/90 text-sm flex items-center space-x-1">
                      <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"/>
                      <span>
                        {language === 'ar' ? 'متاح الآن • صوت ونص' : 'Online • Voice & Text'}
                      </span>
                    </p>
                  </div>
                </div>
                
                {/* Language Selector */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all"
                  >
                    <Globe className="w-6 h-6 text-white" />
                  </motion.button>
                  
                  <AnimatePresence>
                    {showLanguageMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                        className="absolute top-12 right-0 glass rounded-xl p-2 min-w-[120px] border border-white/20"
                      >
                        <button
                          onClick={() => changeLanguage('en')}
                          className={`w-full px-4 py-2 rounded-lg text-left transition-all ${
                            language === 'en' ? 'bg-primary-500 text-white' : 'text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          🇬🇧 English
                        </button>
                        <button
                          onClick={() => changeLanguage('ar')}
                          className={`w-full px-4 py-2 rounded-lg text-left transition-all ${
                            language === 'ar' ? 'bg-primary-500 text-white' : 'text-gray-300 hover:bg-white/10'
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

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <motion.div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                          : 'bg-gradient-to-r from-primary-500 to-emerald-500'
                      }`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      {message.sender === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </motion.div>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'glass text-white border border-primary-500/30'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
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
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-emerald-500 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="glass px-4 py-3 rounded-2xl border border-primary-500/30">
                      <div className="flex space-x-2">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                            className="w-2 h-2 bg-primary-400 rounded-full"
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
            <div className="p-4 bg-black/20 border-t border-white/10">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={language === 'ar' ? 'اسأل عن رعاية النباتات...' : 'Ask about plant care...'}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-all pr-12"
                    disabled={isTyping || isListening}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                  {isListening && (
                    <motion.div
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                    </motion.div>
                  )}
                </div>
                
                {/* Voice Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleVoiceInput}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isListening 
                      ? 'bg-red-500 animate-pulse' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}
                  disabled={isTyping}
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5 text-white" />
                  ) : (
                    <Mic className="w-5 h-5 text-white" />
                  )}
                </motion.button>

                {/* Send Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isTyping || isListening}
                  className="w-12 h-12 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary-500/50 transition-all"
                >
                  {isTyping ? (
                    <Loader className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 text-white" />
                  )}
                </motion.button>
              </div>
              
              <p className="text-xs text-gray-400 mt-2 text-center">
                {language === 'ar' 
                  ? '🎤 استخدم الصوت أو اكتب رسالتك' 
                  : '🎤 Use voice or type your message'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AdvancedChatbot
