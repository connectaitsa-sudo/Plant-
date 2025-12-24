import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, Leaf, Shield, Zap, Target, Calendar, CheckCircle } from 'lucide-react'
import { DiseaseVideo } from '../data/diseaseVideos'
import { useEffect } from 'react'

interface DetailedInfoModalProps {
  diseaseVideo: DiseaseVideo | null
  plantName?: string
  onClose: () => void
}

const DetailedInfoModal = ({ diseaseVideo, plantName, onClose }: DetailedInfoModalProps) => {
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

  const getSeverityBadge = () => {
    switch (diseaseVideo.severity) {
      case 'High': return 'bg-red-500 text-white'
      case 'Medium': return 'bg-yellow-500 text-black'
      case 'Low': return 'bg-green-500 text-white'
      default: return 'bg-primary-500 text-white'
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
          className="w-full max-w-6xl max-h-[90vh] glass rounded-3xl overflow-hidden border-2 border-primary-500/30 flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 via-emerald-500 to-primary-600 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Leaf className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{diseaseVideo.diseaseName}</h2>
                    {plantName && (
                      <p className="text-lg text-white/90">🌿 {plantName}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${getSeverityBadge()}`}>
                    {diseaseVideo.severity} Severity
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm font-bold bg-white/20 text-white">
                    Complete Treatment Guide
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 hover:bg-white/20 rounded-full transition-all"
              >
                <X className="w-7 h-7 text-white" />
              </button>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Description */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="glass p-6 rounded-2xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">About This Disease</h3>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">{diseaseVideo.detailedDescription}</p>
              </motion.div>

              {/* Symptoms & Causes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Symptoms */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="glass p-6 rounded-2xl border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Key Symptoms</h3>
                  </div>
                  <ul className="space-y-3">
                    {diseaseVideo.symptoms.map((symptom, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-primary-400 mt-1 flex-shrink-0">•</span>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Causes */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="glass p-6 rounded-2xl border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Common Causes</h3>
                  </div>
                  <ul className="space-y-3">
                    {diseaseVideo.causes.map((cause, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-primary-400 mt-1 flex-shrink-0">•</span>
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Treatment Protocol */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="glass p-6 rounded-2xl border-2 border-emerald-500/30"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Complete Treatment Protocol</h3>
                </div>

                {/* Two-Way Treatment */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Organic Remedies */}
                  <div className="bg-emerald-500/10 p-5 rounded-xl border border-emerald-500/30">
                    <h4 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🌿</span>
                      Organic Home Remedies
                    </h4>
                    <ul className="space-y-3">
                      {diseaseVideo.treatment.slice(0, 3).map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <span className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Chemical Treatments */}
                  <div className="bg-blue-500/10 p-5 rounded-xl border border-blue-500/30">
                    <h4 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
                      <span className="text-2xl">💊</span>
                      Chemical Treatments & Medicines
                    </h4>
                    <ul className="space-y-3">
                      {diseaseVideo.treatment.slice(3, 6).map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <span className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Additional Steps */}
                {diseaseVideo.treatment.length > 6 && (
                  <div>
                    <h4 className="text-lg font-bold text-white mb-3">Additional Treatment Steps:</h4>
                    <ul className="space-y-2">
                      {diseaseVideo.treatment.slice(6).map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>

              {/* Prevention & Recovery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Prevention */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="glass p-6 rounded-2xl border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Prevention Tips</h3>
                  </div>
                  <ul className="space-y-3">
                    {diseaseVideo.prevention.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-emerald-400 mt-1 flex-shrink-0">✓</span>
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
                  className={`p-6 rounded-2xl border-2 bg-gradient-to-br ${getSeverityColor()}/10`}
                  style={{ borderColor: `var(--${diseaseVideo.severity.toLowerCase()}-color)` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getSeverityColor()} flex items-center justify-center`}>
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Recovery Timeline</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 rounded-full bg-primary-400 mt-1.5 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-white">Week 1</p>
                        <p className="text-sm text-gray-300">Initial improvement visible</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-white">Week 2-3</p>
                        <p className="text-sm text-gray-300">Significant recovery progress</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-400 mt-1.5 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-white">Week 4</p>
                        <p className="text-sm text-gray-300">Full recovery expected with proper care</p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-white/5 rounded-lg">
                      <p className="text-xs text-gray-400">
                        💡 <strong>Important:</strong> Continue treatment protocol and monitor daily. 
                        Consult agricultural experts if symptoms worsen or persist.
                      </p>
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
                className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-primary-500/50 transition-all"
              >
                Close Treatment Guide
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default DetailedInfoModal
