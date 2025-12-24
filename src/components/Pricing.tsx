import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check, Zap, Camera, Video, Cpu, Bell, Shield, Cloud, MapPin, Activity, Plane } from 'lucide-react'
import { useState } from 'react'

const Pricing = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: 'Free',
      icon: Camera,
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for home gardeners',
      gradient: 'from-gray-500 to-gray-600',
      features: [
        'Image Upload Analysis',
        'Up to 5 images per day',
        'Basic disease detection',
        'Standard treatment recommendations',
        'Email support',
        'Community access'
      ],
      limitations: [
        'No live video detection',
        'No real-time alerts',
        'No drone integration'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      icon: Video,
      price: { monthly: 49, yearly: 490 },
      description: 'For professional farmers & greenhouses',
      gradient: 'from-primary-500 to-emerald-500',
      features: [
        '🎥 Live Video Detection',
        'Real-time disease monitoring',
        'Unlimited image analysis',
        'Single camera/drone integration',
        'Instant alert notifications',
        'Advanced treatment plans',
        'NVIDIA Jetson support',
        'Auto-mark diseased areas',
        'Historical data tracking',
        'Priority email & chat support',
        'API access'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true,
      badge: 'Most Popular'
    },
    {
      name: 'Enterprise',
      icon: Plane,
      price: { monthly: 199, yearly: 1990 },
      description: 'For large farms & agricultural businesses',
      gradient: 'from-purple-500 to-pink-500',
      features: [
        '🚁 Multi-Drone Fleet Support',
        'Unlimited live video streams',
        'Multiple camera integration',
        'Advanced AI disease detection',
        'Real-time GPS mapping & marking',
        'Automated alert system',
        'Custom treatment protocols',
        'NVIDIA Jetson Orin Nano optimized',
        'Edge computing support',
        'Thermal imaging support',
        'Team collaboration tools',
        'Custom integrations',
        'Dedicated account manager',
        '24/7 phone support',
        'On-site setup assistance'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      badge: 'Best Value'
    }
  ]

  const liveDetectionFeatures = [
    {
      icon: Video,
      title: 'Real-Time Video Monitoring',
      description: 'Stream live video from cameras or drones for instant disease detection',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Cpu,
      title: 'NVIDIA Jetson Integration',
      description: 'Optimized for NVIDIA Jetson Orin Nano and Xavier for edge AI processing',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Bell,
      title: 'Instant Alerts',
      description: 'Get immediate notifications when diseases are detected in your crops',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: MapPin,
      title: 'Auto-Marking & GPS',
      description: 'Automatically marks diseased areas with GPS coordinates for precise treatment',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Plane,
      title: 'Drone Fleet Support',
      description: 'Connect multiple drones for large-scale automated farm monitoring',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Activity,
      title: 'Continuous Monitoring',
      description: '24/7 automated surveillance with real-time disease tracking and analytics',
      color: 'from-teal-500 to-cyan-500'
    }
  ]

  const getPrice = (plan: typeof plans[0]) => {
    return billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly
  }

  return (
    <section id="pricing" className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-primary-950/20 to-black"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">
            Pricing Plans
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
            Choose Your{' '}
            <span className="text-gradient">Perfect Plan</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From simple image analysis to advanced live video detection with drone integration
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mt-8 gap-4">
            <span className={`text-lg font-semibold transition-colors ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-16 h-8 glass rounded-full transition-all"
            >
              <motion.div
                animate={{ x: billingCycle === 'monthly' ? 2 : 34 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-6 h-6 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full"
              />
            </button>
            <span className={`text-lg font-semibold transition-colors ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 bg-gradient-to-r from-primary-500 to-emerald-500 text-white text-sm font-bold rounded-full"
              >
                Save up to 17%
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`relative glass rounded-3xl p-8 hover:scale-105 transition-all ${
                plan.popular ? 'border-2 border-primary-500 shadow-2xl shadow-primary-500/20' : ''
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className={`px-4 py-1.5 bg-gradient-to-r ${plan.gradient} text-white text-sm font-bold rounded-full shadow-lg`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-6 mx-auto`}
              >
                <plan.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Plan Info */}
              <h3 className="text-2xl font-bold text-white text-center mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-center mb-6">{plan.description}</p>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gradient">${getPrice(plan)}</span>
                  {plan.price.monthly > 0 && (
                    <span className="text-gray-400">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  )}
                </div>
                {billingCycle === 'yearly' && plan.price.monthly > 0 && (
                  <p className="text-sm text-primary-400 mt-2">
                    Save ${(plan.price.monthly * 12 - plan.price.yearly)} per year!
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation, i) => (
                  <li key={i} className="flex items-start space-x-3 opacity-50">
                    <span className="text-gray-500 flex-shrink-0">✕</span>
                    <span className="text-gray-500 line-through">{limitation}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary-500 to-emerald-500 text-white hover:shadow-xl hover:shadow-primary-500/50'
                    : 'glass text-white hover:bg-white/20'
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Live Detection Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Live Video Detection{' '}
              <span className="text-gradient">Features</span>
            </h3>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Advanced real-time monitoring with AI-powered disease detection for your crops
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveDetectionFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass p-6 rounded-2xl hover:bg-white/10 transition-all"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>
                <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Specs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-16 glass p-8 rounded-3xl border-2 border-primary-500/30"
        >
          <div className="text-center mb-8">
            <Cpu className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Powered by Edge AI Technology
            </h3>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Our live detection system is optimized for NVIDIA Jetson devices, enabling real-time AI processing directly on your cameras and drones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Cpu, label: 'NVIDIA Jetson Orin Nano', desc: 'Edge AI processing' },
              { icon: Cloud, label: 'Hybrid Cloud/Edge', desc: 'Flexible deployment' },
              { icon: Shield, label: 'Secure & Private', desc: 'Your data stays safe' },
              { icon: Zap, label: 'Real-Time', desc: '<100ms latency' }
            ].map((spec, i) => (
              <div key={i} className="text-center">
                <spec.icon className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                <h4 className="font-bold text-white mb-1">{spec.label}</h4>
                <p className="text-sm text-gray-400">{spec.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
