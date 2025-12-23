import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Scan, Brain, Zap, Shield, TrendingUp, Globe } from 'lucide-react'

const features = [
  {
    icon: Scan,
    title: 'Instant Scanning',
    description: 'Upload a photo and get results in seconds with our advanced AI technology',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Deep learning models trained on millions of plant images for accurate diagnosis',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    icon: Zap,
    title: 'Real-Time Detection',
    description: 'Lightning-fast processing ensures you get results without any delay',
    color: 'from-teal-400 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Treatment Plans',
    description: 'Comprehensive treatment recommendations for every identified disease',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Monitor your plant health over time with detailed analytics and insights',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    icon: Globe,
    title: 'Global Database',
    description: 'Access information about plant diseases from around the world',
    color: 'from-indigo-400 to-purple-500',
  },
]

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="glass p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 h-full">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.6 }}
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 glow-green`}
        >
          <feature.icon className="w-8 h-8 text-white" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient transition-all">
          {feature.title}
        </h3>
        
        <p className="text-gray-400 leading-relaxed">
          {feature.description}
        </p>

        {/* Hover Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, rgba(34, 197, 94, 0.1), transparent)`,
          }}
        />
      </div>
    </motion.div>
  )
}

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-primary-400 font-semibold text-sm uppercase tracking-wider"
          >
            Features
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6"
          >
            Powerful Tools for{' '}
            <span className="text-gradient">Plant Care</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Everything you need to keep your plants healthy and thriving
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
