import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Info, Leaf } from 'lucide-react'
import { DiseaseVideo } from '../data/diseaseVideos'
import { useState, useEffect } from 'react'

interface TreatmentVideoPlayerProps {
  diseaseVideo: DiseaseVideo | null
  plantName?: string
  onClose: () => void
}

const TreatmentVideoPlayer = ({ diseaseVideo, plantName, onClose }: TreatmentVideoPlayerProps) => {
  const [showInfo, setShowInfo] = useState(false)

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (!diseaseVideo) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 z-[70] flex items-center justify-center backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-6xl mx-4 my-8 glass rounded-3xl overflow-hidden border-2 border-primary-500/30"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 via-emerald-500 to-primary-600 p-4 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" />
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                    Treatment Demonstration
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {plantName && (
                    <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
                      <Leaf className="w-4 h-4 text-white" />
                      <span className="text-sm font-semibold text-white">{plantName}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-white">{diseaseVideo.diseaseName}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    diseaseVideo.severity === 'High' ? 'bg-red-500 text-white' :
                    diseaseVideo.severity === 'Medium' ? 'bg-yellow-500 text-black' :
                    'bg-green-500 text-white'
                  }`}>
                    {diseaseVideo.severity} Severity
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-all flex-shrink-0"
              >
                <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </button>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative bg-black" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={`${diseaseVideo.videoUrl}?autoplay=1&rel=0&modestbranding=1&cc_load_policy=1`}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={diseaseVideo.videoTitle}
            />
          </div>

          {/* Info Section */}
          <div className="p-4 sm:p-6 space-y-4">
            {/* Toggle Info Button */}
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="w-full flex items-center justify-between px-4 py-3 bg-primary-500/20 hover:bg-primary-500/30 rounded-xl transition-all group"
            >
              <div className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-primary-400" />
                <span className="text-white font-semibold">
                  {showInfo ? 'Hide' : 'Show'} Treatment Details
                </span>
              </div>
              <motion.div
                animate={{ rotate: showInfo ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </button>

            {/* Detailed Information */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden space-y-4"
                >
                  {/* Description */}
                  <div className="glass p-4 rounded-xl">
                    <h3 className="text-lg font-bold text-white mb-2">About This Disease</h3>
                    <p className="text-gray-300 leading-relaxed">{diseaseVideo.detailedDescription}</p>
                  </div>

                  {/* Symptoms */}
                  <div className="glass p-4 rounded-xl">
                    <h3 className="text-lg font-bold text-white mb-3">Key Symptoms</h3>
                    <ul className="space-y-2">
                      {diseaseVideo.symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-primary-400 mt-1 flex-shrink-0">•</span>
                          <span className="text-gray-300">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Treatment Steps */}
                  <div className="glass p-4 rounded-xl">
                    <h3 className="text-lg font-bold text-white mb-3">Treatment Steps</h3>
                    <div className="space-y-3">
                      {diseaseVideo.treatment.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-white">{index + 1}</span>
                          </div>
                          <span className="text-gray-300">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prevention */}
                  <div className="glass p-4 rounded-xl">
                    <h3 className="text-lg font-bold text-white mb-3">Prevention Tips</h3>
                    <ul className="space-y-2">
                      {diseaseVideo.prevention.map((tip, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-emerald-400 mt-1 flex-shrink-0">✓</span>
                          <span className="text-gray-300">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default TreatmentVideoPlayer
