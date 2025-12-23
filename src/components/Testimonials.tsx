import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Home Gardener',
    image: '🌻',
    rating: 5,
    text: 'PlantCure saved my garden! The AI detection is incredibly accurate and the 3D visualizations make it so easy to understand what\'s wrong with my plants.',
  },
  {
    name: 'Michael Chen',
    role: 'Professional Agriculturist',
    image: '🌾',
    rating: 5,
    text: 'As a professional, I need reliable tools. PlantCure delivers with its precise diagnostics and comprehensive treatment plans. The interface is stunning too!',
  },
  {
    name: 'Emma Williams',
    role: 'Botany Student',
    image: '🌿',
    rating: 5,
    text: 'The most beautiful plant disease detection app I\'ve ever used. The animations and 3D effects make learning about plant diseases actually enjoyable!',
  },
  {
    name: 'David Martinez',
    role: 'Greenhouse Owner',
    image: '🪴',
    rating: 5,
    text: 'I use PlantCure daily in my greenhouse. It\'s fast, accurate, and the treatment recommendations have saved me thousands of dollars in crop losses.',
  },
  {
    name: 'Lisa Anderson',
    role: 'Urban Farmer',
    image: '🌱',
    rating: 5,
    text: 'The instant detection feature is a game-changer. I can quickly diagnose issues across my urban farm and take immediate action. Highly recommend!',
  },
  {
    name: 'James Thompson',
    role: 'Landscape Designer',
    image: '🍃',
    rating: 5,
    text: 'PlantCure is now an essential tool in my workflow. The visual presentation impresses clients and the accuracy ensures healthy landscapes.',
  },
]

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="glass p-8 rounded-2xl relative group hover:bg-white/20 transition-all h-full"
    >
      {/* Quote Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.3 + index * 0.1 }}
        className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg glow-green"
      >
        <Quote className="w-6 h-6 text-white" />
      </motion.div>

      {/* Rating */}
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4 + index * 0.1 + i * 0.05 }}
          >
            <Star className="w-4 h-4 fill-primary-400 text-primary-400" />
          </motion.div>
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-300 leading-relaxed mb-6 text-lg">
        "{testimonial.text}"
      </p>

      {/* Author */}
      <div className="flex items-center space-x-4 mt-auto">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-14 h-14 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-full flex items-center justify-center text-2xl"
        >
          {testimonial.image}
        </motion.div>
        <div>
          <div className="font-semibold text-white group-hover:text-gradient transition-all">
            {testimonial.name}
          </div>
          <div className="text-sm text-gray-400">{testimonial.role}</div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.1), transparent)',
        }}
      />
    </motion.div>
  )
}

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-primary-950/5 to-black"></div>
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
            Loved by{' '}
            <span className="text-gradient">Thousands</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See what our community has to say about their experience with PlantCure
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">Join our growing community of happy plant parents</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
