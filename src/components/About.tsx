import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Target, Users, Award, Zap } from 'lucide-react'

const stats = [
  { icon: Target, value: '99.8%', label: 'Accuracy Rate', color: 'from-green-400 to-emerald-500' },
  { icon: Users, value: '50K+', label: 'Active Users', color: 'from-emerald-400 to-teal-500' },
  { icon: Award, value: '100+', label: 'Plant Species', color: 'from-teal-400 to-cyan-500' },
  { icon: Zap, value: '<1s', label: 'Detection Time', color: 'from-cyan-400 to-blue-500' },
]

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-primary-950/10 to-black"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">
              About PlantCure
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Revolutionizing{' '}
              <span className="text-gradient">Plant Healthcare</span>
            </h2>
            
            <p className="text-xl text-gray-400 mb-6 leading-relaxed">
              PlantCure combines cutting-edge artificial intelligence with stunning 3D visualizations 
              to provide the most advanced plant disease detection platform available today.
            </p>
            
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Our mission is to make plant care accessible to everyone, from home gardeners to 
              professional agriculturists. With state-of-the-art machine learning models and an 
              intuitive interface, diagnosing and treating plant diseases has never been easier.
            </p>

            <div className="space-y-4">
              {[
                'AI-powered disease detection with 99%+ accuracy',
                'Comprehensive treatment plans for every disease',
                'Real-time analysis and instant results',
                'Beautiful, intuitive user experience',
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-4 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
            >
              Learn More About Our Technology
            </motion.button>
          </motion.div>

          {/* Right Side - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass p-8 rounded-2xl hover:bg-white/20 transition-all group"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 glow-green`}
                >
                  <stat.icon className="w-7 h-7 text-white" />
                </motion.div>
                
                <div className="text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                
                <div className="text-gray-400 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
