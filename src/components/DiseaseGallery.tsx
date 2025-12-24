import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import DiseaseCard3D from './3D/DiseaseCard3D'

const diseases = [
  {
    id: 1,
    name: 'Powdery Mildew',
    severity: 'Medium',
    symptoms: 'White powdery spots on leaves',
    treatment: 'Apply fungicide, improve air circulation',
    color: '#fbbf24',
    icon: AlertCircle,
  },
  {
    id: 2,
    name: 'Leaf Blight',
    severity: 'High',
    symptoms: 'Brown patches spreading across leaves',
    treatment: 'Remove infected leaves, use copper-based fungicide',
    color: '#ef4444',
    icon: XCircle,
  },
  {
    id: 3,
    name: 'Root Rot',
    severity: 'High',
    symptoms: 'Wilting, yellowing leaves, mushy roots',
    treatment: 'Reduce watering, improve drainage, repot plant',
    color: '#dc2626',
    icon: XCircle,
  },
  {
    id: 4,
    name: 'Leaf Spot',
    severity: 'Low',
    symptoms: 'Small dark spots on leaves',
    treatment: 'Remove affected leaves, ensure good air flow',
    color: '#22c55e',
    icon: CheckCircle,
  },
  {
    id: 5,
    name: 'Rust Disease',
    severity: 'Medium',
    symptoms: 'Orange-brown pustules on undersides of leaves',
    treatment: 'Apply fungicide, remove infected parts',
    color: '#f97316',
    icon: AlertCircle,
  },
  {
    id: 6,
    name: 'Bacterial Wilt',
    severity: 'High',
    symptoms: 'Rapid wilting, stem discoloration',
    treatment: 'Remove infected plants, disinfect tools',
    color: '#b91c1c',
    icon: XCircle,
  },
]

const DiseaseGallery = () => {
  const [selectedDisease, setSelectedDisease] = useState<typeof diseases[0] | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="diseases" className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-primary-950/20 to-black"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">
            Disease Database
          </span>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
            Common Plant{' '}
            <span className="text-gradient">Diseases</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our comprehensive database of plant diseases with interactive 3D visualizations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {diseases.map((disease, index) => (
            <motion.div
              key={disease.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => setSelectedDisease(disease)}
              className="cursor-pointer group"
            >
              <div className="glass p-6 rounded-2xl hover:bg-white/20 transition-all h-full relative overflow-hidden">
                {/* 3D Background Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DiseaseCard3D color={disease.color} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${disease.color}40, ${disease.color}20)`,
                      }}
                    >
                      <disease.icon className="w-6 h-6" style={{ color: disease.color }} />
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: `${disease.color}20`,
                        color: disease.color,
                      }}
                    >
                      {disease.severity}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gradient transition-all">
                    {disease.name}
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-500 font-semibold">Symptoms:</span>
                      <p className="text-gray-300 mt-1">{disease.symptoms}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 font-semibold">Treatment:</span>
                      <p className="text-gray-300 mt-1">{disease.treatment}</p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 w-full px-4 py-2 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {selectedDisease && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedDisease(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass p-8 rounded-3xl max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-3xl font-bold text-gradient">{selectedDisease.name}</h3>
                <button
                  onClick={() => setSelectedDisease(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4 text-gray-300">
                <p><strong className="text-white">Severity:</strong> {selectedDisease.severity}</p>
                <p><strong className="text-white">Symptoms:</strong> {selectedDisease.symptoms}</p>
                <p><strong className="text-white">Treatment:</strong> {selectedDisease.treatment}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default DiseaseGallery
