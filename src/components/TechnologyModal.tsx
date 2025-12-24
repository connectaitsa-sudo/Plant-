import { motion, AnimatePresence } from 'framer-motion'
import { X, Cpu, Zap, Eye, Shield, Globe, Code } from 'lucide-react'

interface TechnologyModalProps {
  isOpen: boolean
  onClose: () => void
}

const TechnologyModal = ({ isOpen, onClose }: TechnologyModalProps) => {
  const technologies = [
    {
      icon: Cpu,
      title: 'Advanced AI & Machine Learning',
      description: 'Powered by GPT-4o Vision and Google Gemini AI for multi-model disease detection with 99.8% accuracy.',
      features: [
        'Deep learning neural networks',
        'Computer vision for image analysis',
        'Real-time inference under 1 second',
        'Continuous model improvement'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Eye,
      title: 'Image Recognition Technology',
      description: 'State-of-the-art vision models trained on millions of plant disease images from around the world.',
      features: [
        'Multi-angle disease detection',
        'High-resolution image processing',
        'Pattern recognition algorithms',
        'Symptom severity assessment'
      ],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Real-Time Processing',
      description: 'Lightning-fast analysis using cloud-based infrastructure and optimized algorithms.',
      features: [
        'Instant results in <1 second',
        'Batch processing for multiple images',
        'Edge computing capabilities',
        'Scalable cloud infrastructure'
      ],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Voice-enabled AI assistant with support for multiple languages including English and Arabic.',
      features: [
        'Natural language processing',
        'Speech-to-text recognition',
        'Text-to-speech synthesis',
        'RTL (Right-to-Left) support'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Comprehensive Treatment Database',
      description: 'Extensive knowledge base with organic and chemical treatment options for 100+ plant diseases.',
      features: [
        'Expert-curated treatment plans',
        'Organic home remedies',
        'Chemical treatment options',
        'Prevention strategies'
      ],
      color: 'from-red-500 to-rose-500'
    },
    {
      icon: Code,
      title: 'Modern Tech Stack',
      description: 'Built with cutting-edge web technologies for a seamless, responsive experience.',
      features: [
        'React 18 with TypeScript',
        'Three.js for 3D visualizations',
        'Framer Motion animations',
        'Mobile-first responsive design'
      ],
      color: 'from-indigo-500 to-blue-500'
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-[80] flex items-center justify-center overflow-auto p-3 sm:p-4 md:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass rounded-2xl sm:rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-primary-500 via-emerald-500 to-primary-600 p-4 sm:p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 leading-tight"
                  >
                    Our <span className="text-gradient">Technology</span>
                  </motion.h2>
                  <p className="text-sm sm:text-base md:text-lg text-white/90">
                    Powered by cutting-edge AI and modern web technologies
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 sm:p-3 hover:bg-white/20 rounded-full transition-all flex-shrink-0"
                >
                  <X className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8">
              {/* Introduction */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-6 sm:mb-8 md:mb-10"
              >
                <div className="glass p-4 sm:p-6 md:p-8 rounded-2xl border-2 border-primary-500/30">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                    Revolutionary Plant Care Platform
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
                    PlantCure combines the power of artificial intelligence, computer vision, and modern web technologies 
                    to deliver the most advanced plant disease detection and treatment platform available today.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                    Our platform processes over 10,000 images daily, helping gardeners and farmers around the world 
                    diagnose and treat plant diseases with unprecedented accuracy and speed.
                  </p>
                </div>
              </motion.div>

              {/* Technology Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech.title}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="glass p-4 sm:p-6 rounded-2xl hover:bg-white/10 transition-all border border-white/10"
                  >
                    <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center flex-shrink-0 glow-green`}
                      >
                        <tech.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" strokeWidth={2} />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 leading-tight">
                          {tech.title}
                        </h4>
                      </div>
                    </div>
                    
                    <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 leading-relaxed">
                      {tech.description}
                    </p>
                    
                    <ul className="space-y-1.5 sm:space-y-2">
                      {tech.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 + i * 0.05 }}
                          className="flex items-start space-x-2"
                        >
                          <span className="text-primary-400 mt-1 flex-shrink-0">✓</span>
                          <span className="text-xs sm:text-sm text-gray-400">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* Statistics */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 sm:mt-8 md:mt-10 glass p-4 sm:p-6 md:p-8 rounded-2xl border-2 border-primary-500/30"
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">
                  Proven Performance
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                  {[
                    { value: '99.8%', label: 'Accuracy', icon: '🎯' },
                    { value: '<1s', label: 'Response Time', icon: '⚡' },
                    { value: '50K+', label: 'Active Users', icon: '👥' },
                    { value: '100+', label: 'Diseases Detected', icon: '🌿' }
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + i * 0.1, type: 'spring' }}
                      className="text-center p-3 sm:p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                    >
                      <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">{stat.icon}</div>
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Close Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-6 sm:mt-8 text-center"
              >
                <button
                  onClick={onClose}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all text-sm sm:text-base"
                >
                  Got It, Thanks!
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TechnologyModal
