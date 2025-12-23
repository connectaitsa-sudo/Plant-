import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, AlertCircle, CheckCircle, XCircle, MessageCircle } from 'lucide-react'
import { DiseaseVideo } from '../data/diseaseVideos'

interface DiseaseVideoPlayerProps {
  diseaseVideo: DiseaseVideo | null
  onClose: () => void
}

const DiseaseVideoPlayer = ({ diseaseVideo, onClose }: DiseaseVideoPlayerProps) => {
  const [showHelpPrompt, setShowHelpPrompt] = useState(false)

  useEffect(() => {
    // Show help prompt after 3 seconds of video starting
    const timer = setTimeout(() => {
      setShowHelpPrompt(true)
    }, 3000)

    // Auto-hide help prompt after 10 seconds
    const hideTimer = setTimeout(() => {
      setShowHelpPrompt(false)
    }, 13000)

    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [])

  const openChatbot = () => {
    setShowHelpPrompt(false)
    // Trigger chatbot to open by clicking on the chatbot button
    const chatButton = document.querySelector('[data-chatbot-button]') as HTMLElement
    if (chatButton) {
      chatButton.click()
    }
  }

  if (!diseaseVideo) return null

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Low': return CheckCircle
      case 'Medium': return AlertCircle
      case 'High': return XCircle
      default: return AlertCircle
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'text-green-400 bg-green-400/20'
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20'
      case 'High': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const SeverityIcon = getSeverityIcon(diseaseVideo.severity)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto"
      >
        <div className="min-h-screen p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-start justify-between mb-6"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    {diseaseVideo.diseaseName}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(diseaseVideo.severity)}`}>
                    {diseaseVideo.severity} Severity
                  </span>
                </div>
                <p className="text-gray-400">Treatment video will play automatically</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <X className="w-8 h-8" />
              </button>
            </motion.div>

            {/* Video Player */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-3xl overflow-hidden mb-6"
            >
              <div className="aspect-video bg-black relative">
                <iframe
                  width="100%"
                  height="100%"
                  src={`${diseaseVideo.videoUrl}?autoplay=1&cc_load_policy=1&cc_lang_pref=en`}
                  title={diseaseVideo.videoTitle}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
                
                {/* AI Help Prompt */}
                <AnimatePresence>
                  {showHelpPrompt && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 20 }}
                      className="absolute bottom-4 right-4 z-10"
                    >
                      <motion.div
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(16, 185, 129, 0.3)',
                            '0 0 40px rgba(16, 185, 129, 0.6)',
                            '0 0 20px rgba(16, 185, 129, 0.3)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="glass p-4 rounded-2xl max-w-xs"
                      >
                        <div className="flex items-start space-x-3">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-10 h-10 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0"
                          >
                            <MessageCircle className="w-5 h-5 text-white" />
                          </motion.div>
                          <div className="flex-1">
                            <p className="text-white font-semibold mb-2">
                              Need help understanding?
                            </p>
                            <p className="text-gray-300 text-sm mb-3">
                              Ask me anything about this disease or treatment!
                            </p>
                            <div className="flex space-x-2">
                              <button
                                onClick={openChatbot}
                                className="px-4 py-2 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-full text-sm font-semibold hover:shadow-lg transition-all"
                              >
                                Chat Now
                              </button>
                              <button
                                onClick={() => setShowHelpPrompt(false)}
                                className="px-4 py-2 glass text-white rounded-full text-sm hover:bg-white/20 transition-all"
                              >
                                Later
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="p-6 bg-gradient-to-b from-black/50 to-black/80">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Play className="w-5 h-5 text-primary-400" />
                    <h3 className="text-xl font-bold text-white">{diseaseVideo.videoTitle}</h3>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span className="px-2 py-1 bg-white/10 rounded">🔊 Audio</span>
                    <span className="px-2 py-1 bg-white/10 rounded">CC</span>
                    <span className="px-2 py-1 bg-white/10 rounded">Auto-play</span>
                  </div>
                </div>
                <p className="text-gray-400">Duration: {diseaseVideo.duration} • Closed captions available</p>
              </div>
            </motion.div>

            {/* Detailed Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Description */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="glass p-6 rounded-2xl"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <SeverityIcon className={`w-6 h-6 ${getSeverityColor(diseaseVideo.severity).split(' ')[0]}`} />
                  <h4 className="text-2xl font-bold text-white">About This Disease</h4>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {diseaseVideo.detailedDescription}
                </p>
              </motion.div>

              {/* Symptoms */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="glass p-6 rounded-2xl"
              >
                <h4 className="text-2xl font-bold text-white mb-4">Symptoms</h4>
                <ul className="space-y-3">
                  {diseaseVideo.symptoms.map((symptom, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="flex items-start space-x-3"
                    >
                      <span className="text-red-400 mt-1">•</span>
                      <span className="text-gray-300 leading-relaxed">{symptom}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Causes */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="glass p-6 rounded-2xl"
              >
                <h4 className="text-2xl font-bold text-white mb-4">Causes</h4>
                <ul className="space-y-3">
                  {diseaseVideo.causes.map((cause, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      className="flex items-start space-x-3"
                    >
                      <span className="text-yellow-400 mt-1">•</span>
                      <span className="text-gray-300 leading-relaxed">{cause}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Treatment */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="glass p-6 rounded-2xl bg-gradient-to-br from-primary-500/10 to-emerald-500/10 border border-primary-500/30"
              >
                <h4 className="text-2xl font-bold text-white mb-4">Treatment Steps</h4>
                <ul className="space-y-3">
                  {diseaseVideo.treatment.map((step, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      className="flex items-start space-x-3"
                    >
                      <span className="text-primary-400 font-bold mt-1">{index + 1}.</span>
                      <span className="text-gray-200 leading-relaxed font-medium">{step}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Prevention */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="glass p-6 rounded-2xl lg:col-span-2"
              >
                <h4 className="text-2xl font-bold text-white mb-4">Prevention Tips</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {diseaseVideo.prevention.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.05 }}
                      className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 leading-relaxed">{tip}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Close Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-center"
            >
              <button
                onClick={onClose}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
              >
                Close and Return
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default DiseaseVideoPlayer
