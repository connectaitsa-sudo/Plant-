import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Loader } from 'lucide-react'
import { DiseaseVideo } from '../data/diseaseVideos'

interface AIVideoTreatmentProps {
  diseaseVideo: DiseaseVideo | null
  plantName?: string
  onClose: () => void
}

interface VideoSlide {
  id: number
  title: string
  content: string
  duration: number
  voiceText: string
}

const AIVideoTreatment = ({ diseaseVideo, plantName, onClose }: AIVideoTreatmentProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isGenerating, setIsGenerating] = useState(true)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const progressIntervalRef = useRef<number | null>(null)

  if (!diseaseVideo) return null

  // Generate AI treatment video slides
  const generateVideoSlides = (): VideoSlide[] => {
    return [
      {
        id: 1,
        title: `${diseaseVideo.diseaseName} Detection`,
        content: `Your plant "${plantName || 'Unknown Plant'}" has been diagnosed with ${diseaseVideo.diseaseName}. This is a ${diseaseVideo.severity.toLowerCase()} severity condition that requires immediate attention.`,
        duration: 5000,
        voiceText: `Your plant has been diagnosed with ${diseaseVideo.diseaseName}. This is a ${diseaseVideo.severity.toLowerCase()} severity condition.`
      },
      {
        id: 2,
        title: 'Understanding the Disease',
        content: diseaseVideo.detailedDescription,
        duration: 6000,
        voiceText: diseaseVideo.detailedDescription
      },
      {
        id: 3,
        title: 'Identifying Symptoms',
        content: `Look for these key symptoms:\n\n${diseaseVideo.symptoms.map((s, i) => `${i + 1}. ${s}`).join('\n\n')}`,
        duration: 7000,
        voiceText: `Key symptoms include: ${diseaseVideo.symptoms.join('. ')}`
      },
      {
        id: 4,
        title: 'Root Causes',
        content: `This disease is typically caused by:\n\n${diseaseVideo.causes.map((c, i) => `${i + 1}. ${c}`).join('\n\n')}`,
        duration: 6000,
        voiceText: `The main causes are: ${diseaseVideo.causes.join('. ')}`
      },
      {
        id: 5,
        title: 'Treatment Protocol',
        content: `Follow these steps for effective treatment:\n\n${diseaseVideo.treatment.map((t, i) => `Step ${i + 1}: ${t}`).join('\n\n')}`,
        duration: 8000,
        voiceText: `Treatment steps: ${diseaseVideo.treatment.join('. ')}`
      },
      {
        id: 6,
        title: 'Prevention Measures',
        content: `Prevent future outbreaks by:\n\n${diseaseVideo.prevention.map((p, i) => `${i + 1}. ${p}`).join('\n\n')}`,
        duration: 7000,
        voiceText: `Prevention tips: ${diseaseVideo.prevention.join('. ')}`
      },
      {
        id: 7,
        title: 'Recovery Timeline',
        content: `With proper treatment, your plant should show improvement within 1-2 weeks. Continue monitoring and maintain the treatment protocol for best results. Consult with our AI assistant if symptoms persist.`,
        duration: 5000,
        voiceText: 'With proper treatment, your plant should recover within one to two weeks. Continue monitoring progress.'
      }
    ]
  }

  const [slides] = useState<VideoSlide[]>(generateVideoSlides())

  // Initialize - start playing after generation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGenerating(false)
      startAutoPlay()
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Text-to-speech function
  const speak = (text: string) => {
    if (!isMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 1
      window.speechSynthesis.speak(utterance)
    }
  }

  // Start auto-play
  const startAutoPlay = () => {
    if (currentSlide < slides.length && isPlaying) {
      const slide = slides[currentSlide]
      speak(slide.voiceText)
      
      // Progress animation
      const duration = slide.duration
      const interval = 50
      let elapsed = 0
      
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      
      progressIntervalRef.current = setInterval(() => {
        elapsed += interval
        setProgress((elapsed / duration) * 100)
        
        if (elapsed >= duration) {
          if (currentSlide < slides.length - 1) {
            setCurrentSlide(prev => prev + 1)
            setProgress(0)
          } else {
            setIsPlaying(false)
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current)
            }
          }
        }
      }, interval)
    }
  }

  // Handle play/pause
  useEffect(() => {
    if (isPlaying && !isGenerating) {
      startAutoPlay()
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      window.speechSynthesis.cancel()
    }
    
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isPlaying, currentSlide, isGenerating])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (!isMuted) {
      window.speechSynthesis.cancel()
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setProgress(0)
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const handleClose = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
    window.speechSynthesis.cancel()
    onClose()
  }

  const getSeverityColor = () => {
    switch (diseaseVideo.severity) {
      case 'Low': return 'from-green-500 to-emerald-500'
      case 'Medium': return 'from-yellow-500 to-orange-500'
      case 'High': return 'from-red-500 to-pink-500'
      default: return 'from-primary-500 to-emerald-500'
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/98 z-[70] flex items-center justify-center"
      >
        <div className="w-full h-full flex flex-col p-4 md:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                AI Treatment Video: <span className="text-gradient">{diseaseVideo.diseaseName}</span>
              </h2>
              {plantName && (
                <p className="text-gray-400 text-lg">
                  Plant: <span className="text-primary-400 font-semibold">{plantName}</span>
                </p>
              )}
            </div>
            <button
              onClick={handleClose}
              className="p-3 hover:bg-white/10 rounded-full transition-all group"
            >
              <X className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
            </button>
          </motion.div>

          {/* Video Player */}
          <motion.div
            ref={videoContainerRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex-1 glass rounded-3xl overflow-hidden relative"
          >
            {isGenerating ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary-900/50 to-black">
                <Loader className="w-16 h-16 text-primary-400 animate-spin mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Generating AI Treatment Video...</h3>
                <p className="text-gray-400">Creating personalized treatment presentation</p>
              </div>
            ) : (
              <>
                {/* Video Content */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  {/* Animated Background */}
                  <motion.div
                    key={currentSlide}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.3 }}
                    transition={{ duration: 1 }}
                    className={`absolute inset-0 bg-gradient-to-br ${getSeverityColor()} blur-3xl`}
                  />
                  
                  {/* Content Slide */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="relative z-10 max-w-4xl mx-auto p-8 md:p-16 text-center"
                    >
                      {/* Slide Number */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block px-4 py-2 bg-white/10 rounded-full mb-6"
                      >
                        <span className="text-primary-400 font-bold">
                          {currentSlide + 1} / {slides.length}
                        </span>
                      </motion.div>

                      {/* Title */}
                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
                      >
                        {slides[currentSlide].title}
                      </motion.h3>

                      {/* Content */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-200 leading-relaxed whitespace-pre-line"
                      >
                        {slides[currentSlide].content}
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Decorative Elements */}
                  <div className="absolute top-10 left-10 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/10">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${getSeverityColor()}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Controls Overlay */}
                <div className="absolute bottom-8 left-0 right-0 px-8">
                  <div className="glass p-4 rounded-2xl flex items-center justify-between">
                    {/* Play/Pause */}
                    <button
                      onClick={togglePlayPause}
                      className="p-3 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full hover:scale-110 transition-transform"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-white" fill="white" />
                      ) : (
                        <Play className="w-6 h-6 text-white" fill="white" />
                      )}
                    </button>

                    {/* Slide Indicators */}
                    <div className="flex items-center space-x-2">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`h-2 rounded-full transition-all ${
                            index === currentSlide
                              ? 'w-8 bg-primary-400'
                              : index < currentSlide
                              ? 'w-2 bg-primary-600'
                              : 'w-2 bg-white/30'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={toggleMute}
                        className="p-3 hover:bg-white/10 rounded-full transition-all"
                      >
                        {isMuted ? (
                          <VolumeX className="w-6 h-6 text-white" />
                        ) : (
                          <Volume2 className="w-6 h-6 text-white" />
                        )}
                      </button>
                      <button
                        onClick={toggleFullscreen}
                        className="p-3 hover:bg-white/10 rounded-full transition-all"
                      >
                        <Maximize2 className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {/* Footer Info */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-400 mb-4">
              AI-Generated Treatment Video • Voice Narration • Interactive Presentation
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={handleClose}
                className="px-8 py-4 glass text-white rounded-full hover:bg-white/20 transition-all"
              >
                Close Video
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(0)
                  setProgress(0)
                  setIsPlaying(true)
                }}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all flex items-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Replay Video</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AIVideoTreatment
