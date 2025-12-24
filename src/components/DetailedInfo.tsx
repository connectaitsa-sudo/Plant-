import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Book, Leaf, Droplets, Sun, Wind, Bug, Shield, TrendingUp } from 'lucide-react'
import { useState } from 'react'

const categories = [
  {
    id: 'prevention',
    title: 'Disease Prevention',
    icon: Shield,
    color: 'from-green-400 to-emerald-500',
    content: {
      overview: 'Prevention is always better than cure when it comes to plant diseases. Learn essential techniques to keep your plants healthy.',
      points: [
        'Proper watering - avoid overwatering which leads to fungal diseases',
        'Good air circulation - prevents moisture buildup and fungal growth',
        'Regular inspection - catch problems early before they spread',
        'Clean tools - sterilize pruning shears to prevent disease transmission',
        'Proper spacing - give plants room to breathe and grow',
        'Quality soil - use well-draining soil with proper nutrients',
        'Remove debris - clean fallen leaves and dead plant matter regularly'
      ]
    }
  },
  {
    id: 'watering',
    title: 'Watering Best Practices',
    icon: Droplets,
    color: 'from-blue-400 to-cyan-500',
    content: {
      overview: 'Proper watering is crucial for plant health. Too much or too little water can stress plants and make them susceptible to diseases.',
      points: [
        'Water at the base - avoid wetting leaves to prevent fungal diseases',
        'Morning watering - allows foliage to dry during the day',
        'Check soil moisture - use finger test or moisture meter',
        'Deep watering - encourages deep root growth',
        'Drainage matters - ensure pots have drainage holes',
        'Adjust seasonally - less in winter, more in summer',
        'Water quality - use filtered or rainwater when possible'
      ]
    }
  },
  {
    id: 'sunlight',
    title: 'Light Requirements',
    icon: Sun,
    color: 'from-yellow-400 to-orange-500',
    content: {
      overview: 'Light is essential for photosynthesis and plant health. Understanding your plant\'s light needs prevents stress and disease.',
      points: [
        'Know your plant - different species have different light needs',
        'Direct vs indirect - understand the difference',
        'Rotate regularly - ensures even growth',
        'Watch for signs - yellowing leaves may indicate light issues',
        'Seasonal adjustments - account for changing daylight hours',
        'Artificial lighting - supplement when natural light is insufficient',
        'Avoid sudden changes - acclimate plants gradually'
      ]
    }
  },
  {
    id: 'air',
    title: 'Air Circulation',
    icon: Wind,
    color: 'from-teal-400 to-green-500',
    content: {
      overview: 'Good air circulation is vital for preventing fungal diseases and promoting strong, healthy growth.',
      points: [
        'Space plants properly - don\'t overcrowd',
        'Prune regularly - remove dense growth',
        'Use fans indoors - gentle air movement helps',
        'Open windows - when weather permits',
        'Avoid stagnant areas - move plants if needed',
        'Humidity control - balance moisture in the air',
        'Monitor microclimates - adjust ventilation as needed'
      ]
    }
  },
  {
    id: 'pests',
    title: 'Pest Management',
    icon: Bug,
    color: 'from-purple-400 to-pink-500',
    content: {
      overview: 'Pests can spread diseases and weaken plants. Early detection and natural control methods are most effective.',
      points: [
        'Regular inspection - check undersides of leaves weekly',
        'Neem oil - natural pest deterrent',
        'Beneficial insects - ladybugs and lacewings control aphids',
        'Soap spray - mild solution for soft-bodied pests',
        'Isolation - quarantine infected plants immediately',
        'Natural predators - encourage birds and beneficial bugs',
        'Companion planting - some plants repel pests naturally'
      ]
    }
  },
  {
    id: 'nutrition',
    title: 'Plant Nutrition',
    icon: Leaf,
    color: 'from-lime-400 to-green-500',
    content: {
      overview: 'Proper nutrition strengthens plants\' immune systems and helps them resist diseases naturally.',
      points: [
        'NPK balance - nitrogen, phosphorus, potassium ratios',
        'Micronutrients - iron, calcium, magnesium are essential',
        'Organic matter - compost improves soil health',
        'Slow-release fertilizers - steady nutrient supply',
        'pH levels - affects nutrient availability',
        'Avoid over-feeding - can cause more harm than good',
        'Seasonal needs - adjust feeding based on growth cycles'
      ]
    }
  },
  {
    id: 'monitoring',
    title: 'Health Monitoring',
    icon: TrendingUp,
    color: 'from-indigo-400 to-purple-500',
    content: {
      overview: 'Regular monitoring helps catch issues early when they\'re easiest to treat. Develop a routine inspection habit.',
      points: [
        'Weekly checks - make it a routine',
        'Photo documentation - track changes over time',
        'Growth tracking - monitor new leaf development',
        'Color changes - yellowing, browning, or spots',
        'Texture changes - wilting, crispiness, or softness',
        'Pest signs - webbing, holes, or sticky residue',
        'Keep records - note treatments and their effectiveness'
      ]
    }
  },
  {
    id: 'knowledge',
    title: 'Plant Knowledge Base',
    icon: Book,
    color: 'from-rose-400 to-red-500',
    content: {
      overview: 'Understanding your specific plants\' needs is fundamental to successful plant care and disease prevention.',
      points: [
        'Research species - learn natural habitat conditions',
        'Growth patterns - understand dormancy and active growth',
        'Common issues - know what diseases your plant is prone to',
        'Temperature needs - respect hardiness zones',
        'Humidity preferences - tropical vs desert plants',
        'Repotting schedule - when and how to repot',
        'Propagation methods - expand your collection safely'
      ]
    }
  }
]

const DetailedInfo = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  return (
    <section id="info" className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-primary-950/5 to-black"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-primary-400 font-semibold text-sm uppercase tracking-wider"
          >
            Knowledge Base
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6"
          >
            Complete Plant Care{' '}
            <span className="text-gradient">Guide</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Everything you need to know about keeping your plants healthy and disease-free
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Buttons */}
          <div className="lg:col-span-1 space-y-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left p-6 rounded-2xl transition-all ${
                  selectedCategory.id === category.id
                    ? 'glass bg-white/20'
                    : 'glass hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`font-semibold ${
                    selectedCategory.id === category.id ? 'text-gradient' : 'text-white'
                  }`}>
                    {category.title}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Content Panel */}
          <motion.div
            key={selectedCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 glass p-8 rounded-3xl"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedCategory.color} flex items-center justify-center`}>
                <selectedCategory.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gradient">{selectedCategory.title}</h3>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {selectedCategory.content.overview}
            </p>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white mb-4">Key Points:</h4>
              {selectedCategory.content.points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start space-x-3 glass p-4 rounded-xl hover:bg-white/10 transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 bg-gradient-to-r from-primary-500/20 to-emerald-500/20 border border-primary-500/30 rounded-2xl"
            >
              <p className="text-white font-semibold mb-2">💡 Pro Tip:</p>
              <p className="text-gray-300">
                Combine these practices for best results. Plant care is holistic - all aspects work together to maintain healthy, disease-resistant plants.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DetailedInfo
