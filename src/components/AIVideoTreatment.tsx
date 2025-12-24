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
      title: `${diseaseVideo.diseaseName} Detected`,
      content: `Plant: ${plantName || 'Unknown Plant'}\n\nDisease: ${diseaseVideo.diseaseName}\n\nSeverity: ${diseaseVideo.severity}\n\nThis condition requires immediate treatment to save your plant.`,
      duration: 8000,
      voiceText: `Your plant has been diagnosed with ${diseaseVideo.diseaseName}. This is a ${diseaseVideo.severity.toLowerCase()} severity condition that requires immediate treatment.`
      },
      {
        id: 2,
        title: 'What is This Disease?',
        content: diseaseVideo.detailedDescription,
        duration: 10000,
        voiceText: diseaseVideo.detailedDescription
      },
      {
        id: 3,
        title: 'Key Symptoms to Look For',
        content: `${diseaseVideo.symptoms.map((s, i) => `${i + 1}. ${s}`).join('\n\n')}`,
        duration: 12000,
        voiceText: `The key symptoms you should look for include: ${diseaseVideo.symptoms.join('. ')}`
      },
      {
        id: 4,
        title: 'Why Does This Happen?',
        content: `Common causes:\n\n${diseaseVideo.causes.map((c, i) => `${i + 1}. ${c}`).join('\n\n')}`,
        duration: 10000,
        voiceText: `This disease is commonly caused by the following factors: ${diseaseVideo.causes.join('. ')}`
      },
      {
        id: 5,
        title: 'Organic Home Remedies',
        content: `Natural treatment methods:\n\n${diseaseVideo.treatment.slice(0, 3).map((t, i) => `${i + 1}. ${t}`).join('\n\n')}`,
        duration: 12000,
        voiceText: `First, let's look at organic home remedies. ${diseaseVideo.treatment.slice(0, 3).join('. ')}`
      },
      {
        id: 6,
        title: 'Chemical Treatments & Medicines',
        content: `Professional chemical solutions:\n\n${diseaseVideo.treatment.slice(3).map((t, i) => `${i + 1}. ${t}`).join('\n\n')}\n\nFor severe cases, consult with agricultural experts for proper fungicides or pesticides.`,
        duration: 12000,
        voiceText: `Now for chemical treatments. ${diseaseVideo.treatment.slice(3).join('. ')} For severe cases, consult with agricultural experts for proper fungicides or pesticides.`
      },
      {
        id: 7,
        title: 'Prevention is Better Than Cure',
        content: `Keep your plant healthy:\n\n${diseaseVideo.prevention.map((p, i) => `${i + 1}. ${p}`).join('\n\n')}`,
        duration: 12000,
        voiceText: `To prevent this disease in the future, follow these important tips: ${diseaseVideo.prevention.join('. ')}`
      },
      {
        id: 8,
        title: 'Expected Recovery & Follow-up',
        content: `Timeline:\n• Week 1: Initial improvement visible\n• Week 2-3: Significant recovery\n• Week 4: Full recovery expected\n\nContinue treatment and monitor daily. If symptoms worsen, seek expert help immediately.`,
        duration: 10000,
        voiceText: 'With proper treatment, your plant should show initial improvement within the first week. Significant recovery occurs in two to three weeks, and full recovery is expected within four weeks. Continue the treatment protocol and monitor your plant daily. If symptoms worsen or persist, consult with agricultural experts immediately.'
      }
    ]
  }

  const [slides] = useState<VideoSlide[]>(generateVideoSlides())

  // Initialize - start playing after generation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGenerating(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Text-to-speech function
  const speak = (text: string) => {
    if (!isMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.85 // Slower for better understanding
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
      
      progressIntervalRef.current = window.setInterval(() => {
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
      }, interval) as unknown as number
    }
  }

  // Handle play/pause
  useEffect(() => {
    if (isPlaying && !isGenerating && slides.length > 0) {
      const timer = setTimeout(() => startAutoPlay(), 500)
      return () => clearTimeout(timer)
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
  }, [isPlaying, currentSlide, isGenerating, slides])

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
        className="fixed inset-0 bg-black/98 z-[70] flex items-center justify-center overflow-auto"
      >
        <div className="w-full h-full flex flex-col p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-start justify-between mb-3 sm:mb-4 md:mb-6 gap-2"
          >
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-1 sm:mb-2 tracking-tight leading-tight">
                <span className="text-gradient">{diseaseVideo.diseaseName}</span>
              </h2>
              {plantName && (
                <p className="text-gray-400 text-sm sm:text-base md:text-lg truncate">
                  Plant: <span className="text-primary-400 font-semibold">{plantName}</span>
                </p>
              )}
            </div>
            <button
              onClick={handleClose}
              className="p-2 sm:p-3 hover:bg-white/10 rounded-full transition-all group flex-shrink-0"
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-400 group-hover:text-white transition-colors" />
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
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight px-2"
                      >
                        {slides[currentSlide].title}
                      </motion.h3>

                      {/* Content */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed whitespace-pre-line px-2"
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
                <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-8 left-0 right-0 px-2 sm:px-4 md:px-6 lg:px-8">
                  <div className="glass p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
                    {/* Play/Pause */}
                    <button
                      onClick={togglePlayPause}
                      className="p-2 sm:p-2.5 md:p-3 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full hover:scale-110 transition-transform flex-shrink-0"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="white" />
                      ) : (
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="white" />
                      )}
                    </button>

                    {/* Slide Indicators */}
                    <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 flex-1 justify-center overflow-x-auto">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`h-1.5 sm:h-2 rounded-full transition-all flex-shrink-0 ${
                            index === currentSlide
                              ? 'w-6 sm:w-8 bg-primary-400'
                              : index < currentSlide
                              ? 'w-1.5 sm:w-2 bg-primary-600'
                              : 'w-1.5 sm:w-2 bg-white/30'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                      <button
                        onClick={toggleMute}
                        className="p-2 sm:p-2.5 md:p-3 hover:bg-white/10 rounded-full transition-all"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                        ) : (
                          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                        )}
                      </button>
                      <button
                        onClick={toggleFullscreen}
                        className="p-2 sm:p-2.5 md:p-3 hover:bg-white/10 rounded-full transition-all hidden sm:block"
                      >
                        <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
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
            className="mt-3 sm:mt-4 md:mt-6 text-center px-2"
          >
            <p className="text-gray-400 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
              AI-Generated • Voice • Interactive
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4">
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 md:py-4 glass text-white rounded-full hover:bg-white/20 transition-all text-sm sm:text-base"
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
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
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
