import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, Leaf, Shield, Zap, Target, Calendar } from 'lucide-react'
import { DiseaseVideo } from '../data/diseaseVideos'
import { useEffect } from 'react'

interface EnhancedTreatmentViewProps {
  diseaseVideo: DiseaseVideo | null
  plantName?: string
  onClose: () => void
}

const EnhancedTreatmentView = ({ diseaseVideo, plantName, onClose }: EnhancedTreatmentViewProps) => {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (!diseaseVideo) return null

  const getSeverityColor = () => {
    switch (diseaseVideo.severity) {
      case 'High': return 'from-red-500 to-pink-500'
      case 'Medium': return 'from-yellow-500 to-orange-500'
      case 'Low': return 'from-green-500 to-emerald-500'
      default: return 'from-primary-500 to-emerald-500'
    }
  }

  const getSeverityBg = () => {
    switch (diseaseVideo.severity) {
      case 'High': return 'bg-red-500/20 border-red-500/50'
      case 'Medium': return 'bg-yellow-500/20 border-yellow-500/50'
      case 'Low': return 'bg-green-500/20 border-green-500/50'
      default: return 'bg-primary-500/20 border-primary-500/50'
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/98 z-[70] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[1800px] h-[90vh] glass rounded-3xl overflow-hidden border-2 border-primary-500/30 flex flex-col"
        >
          {/* Header - Compact */}
          <div className="bg-gradient-to-r from-primary-500 via-emerald-500 to-primary-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{diseaseVideo.diseaseName}</h2>
                {plantName && (
                  <p className="text-sm text-white/90">🌿 {plantName}</p>
                )}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${diseaseVideo.severity === 'High' ? 'bg-red-500' : diseaseVideo.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                {diseaseVideo.severity} Severity
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Main Content - Single View, No Scroll */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
            {/* Left Side - AI Video */}
            <div className="bg-black flex flex-col">
              {/* Video Player */}
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-primary-500/30">
                  {diseaseVideo.videoType === 'heygen' ? (
                    // HeyGen AI Video
                    <iframe
                      src={diseaseVideo.videoUrl}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={diseaseVideo.videoTitle}
                    />
                  ) : (
                    // YouTube Fallback
                    <iframe
                      src={`${diseaseVideo.videoUrl}?autoplay=1&rel=0&modestbranding=1`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={diseaseVideo.videoTitle}
                    />
                  )}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4 bg-gradient-to-r from-primary-900/50 to-emerald-900/50 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">AI-Generated Treatment Video</p>
                    <p className="text-white font-semibold">{diseaseVideo.videoTitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Duration</p>
                    <p className="text-white font-bold">{diseaseVideo.duration}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Complete Details in Grid */}
            <div className="bg-gradient-to-br from-primary-950/30 to-black p-6 overflow-y-auto">
              <div className="space-y-4 h-full">
                {/* Description Card */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="glass p-4 rounded-xl border border-white/10"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-bold text-white">About This Disease</h3>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{diseaseVideo.detailedDescription}</p>
                </motion.div>

                {/* Two Column Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Symptoms */}
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass p-4 rounded-xl border border-white/10"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-bold text-white text-sm">Symptoms</h3>
                    </div>
                    <ul className="space-y-1.5">
                      {diseaseVideo.symptoms.slice(0, 4).map((symptom, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-gray-300">
                          <span className="text-primary-400 mt-0.5 flex-shrink-0">•</span>
                          <span>{symptom}</span>
                        </li>
                      ))}
                      {diseaseVideo.symptoms.length > 4 && (
                        <li className="text-xs text-primary-400 font-semibold">
                          +{diseaseVideo.symptoms.length - 4} more
                        </li>
                      )}
                    </ul>
                  </motion.div>

                  {/* Causes */}
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="glass p-4 rounded-xl border border-white/10"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-bold text-white text-sm">Causes</h3>
                    </div>
                    <ul className="space-y-1.5">
                      {diseaseVideo.causes.slice(0, 4).map((cause, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-gray-300">
                          <span className="text-primary-400 mt-0.5 flex-shrink-0">•</span>
                          <span>{cause}</span>
                        </li>
                      ))}
                      {diseaseVideo.causes.length > 4 && (
                        <li className="text-xs text-primary-400 font-semibold">
                          +{diseaseVideo.causes.length - 4} more
                        </li>
                      )}
                    </ul>
                  </motion.div>
                </div>

                {/* Treatment - Full Width */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="glass p-4 rounded-xl border-2 border-emerald-500/30"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-bold text-white">Treatment Protocol</h3>
                  </div>
                  
                  {/* Organic & Chemical in Two Columns */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {/* Organic Remedies */}
                    <div>
                      <p className="text-xs text-emerald-400 font-semibold mb-2">🌿 Organic Remedies</p>
                      <ul className="space-y-1.5">
                        {diseaseVideo.treatment.slice(0, 3).map((step, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                            <span className="w-4 h-4 rounded-full bg-gradient-to-r from-primary-500 to-emerald-500 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white">
                              {i + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Chemical Treatments */}
                    <div>
                      <p className="text-xs text-blue-400 font-semibold mb-2">💊 Chemical Solutions</p>
                      <ul className="space-y-1.5">
                        {diseaseVideo.treatment.slice(3, 6).map((step, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                            <span className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white">
                              {i + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Prevention & Recovery */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Prevention */}
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="glass p-4 rounded-xl border border-white/10"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-bold text-white text-sm">Prevention</h3>
                    </div>
                    <ul className="space-y-1.5">
                      {diseaseVideo.prevention.slice(0, 4).map((tip, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-gray-300">
                          <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Recovery Timeline */}
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className={`p-4 rounded-xl border ${getSeverityBg()}`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getSeverityColor()} flex items-center justify-center`}>
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-bold text-white text-sm">Recovery</h3>
                    </div>
                    <div className="space-y-2 text-xs text-gray-300">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary-400"></div>
                        <span>Week 1: Initial improvement</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                        <span>Week 2-3: Significant recovery</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <span>Week 4: Full recovery expected</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Close Button */}
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  onClick={onClose}
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
                >
                  Close Treatment Guide
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default EnhancedTreatmentView
