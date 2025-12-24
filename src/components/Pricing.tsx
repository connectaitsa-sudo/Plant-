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
      name: 'Starter',
      icon: Camera,
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for home gardeners & hobbyists',
      gradient: 'from-gray-500 to-gray-600',
      detailedDesc: 'Get started with basic plant disease detection. Upload images manually and receive instant AI-powered analysis with treatment recommendations. Perfect for home gardens and small plant collections.',
      features: [
        '📸 Image Upload Analysis',
        'Up to 5 images per day',
        'Basic AI disease detection',
        '50+ plant diseases coverage',
        'Standard treatment recommendations',
        'Treatment video demonstrations',
        'Email support (48hr response)',
        'Community forum access',
        'Mobile-friendly interface',
        'Save analysis history (7 days)'
      ],
      limitations: [
        'No live video detection',
        'No real-time alerts',
        'No drone integration',
        'No GPS marking',
        'No API access'
      ],
      cta: 'Get Started Free',
      popular: false,
      setupCost: 'No setup fee',
      idealFor: 'Home gardeners, hobbyists, students',
      savings: null
    },
    {
      name: 'Professional',
      icon: Video,
      price: { monthly: 299, yearly: 2990 },
      description: 'Advanced live monitoring for professional farmers',
      gradient: 'from-primary-500 to-emerald-500',
      detailedDesc: 'Professional-grade real-time disease monitoring with camera integration. Connect up to 3 cameras for continuous surveillance with instant AI detection, GPS marking, and automated alerts. Includes NVIDIA Jetson support for edge computing.',
      features: [
        '🎥 Live Video Detection (24/7)',
        'Up to 3 camera/drone streams',
        'Real-time AI disease monitoring',
        'Unlimited image analysis',
        'Instant alert notifications (SMS/Email/Push)',
        'GPS auto-marking of diseased areas',
        'Advanced treatment protocols',
        '100+ plant diseases with 99.8% accuracy',
        'NVIDIA Jetson Nano/Xavier support',
        'Edge AI processing (<100ms latency)',
        'Historical data & analytics dashboard',
        'Custom alert rules & zones',
        'Treatment scheduling system',
        'Weather integration',
        'Mobile & desktop apps',
        'Priority support (12hr response)',
        'API access (10,000 calls/month)',
        'Video recording & playback',
        'Export reports (PDF/Excel)',
        'Cloud storage (50GB)'
      ],
      limitations: [],
              cta: 'Start 14-Day Trial',
              ctaLink: '#dashboard',
              popular: true,
              badge: 'Most Popular',
      setupCost: '$500 one-time setup',
      idealFor: 'Professional farmers, greenhouses, medium farms (50-200 acres)',
      savings: 'Save $598/year with annual plan'
    },
    {
      name: 'Enterprise',
      icon: Plane,
      price: { monthly: 999, yearly: 9990 },
      description: 'Industrial-scale solution for large operations',
      gradient: 'from-purple-500 to-pink-500',
      detailedDesc: 'Complete industrial solution with unlimited camera/drone fleet support, thermal imaging, multi-team collaboration, and dedicated infrastructure. Optimized for NVIDIA Jetson Orin Nano with custom AI models and 24/7 premium support.',
      features: [
        '🚁 Unlimited Drone Fleet Support',
        'Unlimited camera/video streams',
        'Multiple farm locations',
        'Advanced AI with custom model training',
        'Real-time GPS mapping & 3D visualization',
        'Automated multi-drone coordination',
        'Thermal imaging support',
        'Precision agriculture integration',
        'Satellite imagery integration',
        'NVIDIA Jetson Orin Nano optimized',
        'Edge computing infrastructure',
        'Soil & weather sensor integration',
        'Automated treatment scheduling',
        'Team collaboration & role management',
        'Custom alert workflows',
        'Predictive disease analytics',
        'Yield prediction models',
        'Custom integrations & webhooks',
        'White-label solution available',
        'Dedicated account manager',
        '24/7 premium phone support',
        'On-site setup & training',
        'Hardware consultation & procurement',
        'SLA guarantee (99.9% uptime)',
        'Unlimited API calls',
        'Cloud storage (Unlimited)',
        'Advanced security & compliance',
        'Custom reporting & BI tools',
        'Priority feature requests',
        'Quarterly business reviews'
      ],
      limitations: [],
              cta: 'Contact Sales',
              ctaLink: '#dashboard',
              popular: false,
              badge: 'Enterprise Grade',
      setupCost: '$2,500 setup + hardware consultation',
      idealFor: 'Large farms (500+ acres), agricultural corporations, government departments',
      savings: 'Save $1,998/year with annual plan'
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
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gradient">${getPrice(plan)}</span>
                  {plan.price.monthly > 0 && (
                    <span className="text-gray-400">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  )}
                </div>
                {billingCycle === 'yearly' && plan.price.monthly > 0 && plan.savings && (
                  <p className="text-sm text-primary-400 mt-2 font-semibold">
                    {plan.savings}
                  </p>
                )}
                {plan.setupCost && (
                  <p className="text-xs text-gray-500 mt-2">
                    {plan.setupCost}
                  </p>
                )}
              </div>

              {/* Detailed Description */}
              <div className="mb-6 p-4 bg-white/5 rounded-xl">
                <p className="text-sm text-gray-300 leading-relaxed">{plan.detailedDesc}</p>
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-xs text-gray-400 font-semibold mb-1">Ideal For:</p>
                  <p className="text-xs text-primary-400">{plan.idealFor}</p>
                </div>
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
              <motion.a
                href={plan.ctaLink || '#pricing'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all block text-center ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary-500 to-emerald-500 text-white hover:shadow-xl hover:shadow-primary-500/50'
                    : 'glass text-white hover:bg-white/20'
                }`}
              >
                {plan.cta}
              </motion.a>
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

        {/* Detailed Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-16 glass p-6 md:p-8 rounded-3xl border-2 border-primary-500/30"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Detailed Feature Comparison
            </h3>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Choose the plan that perfectly matches your agricultural needs
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-4 pr-4 text-white font-bold">Feature</th>
                  <th className="pb-4 px-4 text-center text-white font-bold">Starter</th>
                  <th className="pb-4 px-4 text-center text-white font-bold">Professional</th>
                  <th className="pb-4 pl-4 text-center text-white font-bold">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { feature: 'Image Analysis per Month', starter: '150 images', pro: 'Unlimited', enterprise: 'Unlimited' },
                  { feature: 'Live Video Streams', starter: '—', pro: 'Up to 3', enterprise: 'Unlimited' },
                  { feature: 'Camera/Drone Support', starter: '—', pro: '3 devices', enterprise: 'Unlimited' },
                  { feature: 'Disease Detection Accuracy', starter: '95%', pro: '99.5%', enterprise: '99.8%' },
                  { feature: 'Detection Speed', starter: '3-5 sec', pro: '<1 sec', enterprise: '<100ms' },
                  { feature: 'GPS Auto-Marking', starter: '—', pro: '✓', enterprise: '✓ Advanced' },
                  { feature: 'Real-Time Alerts', starter: '—', pro: 'SMS/Email', enterprise: 'SMS/Email/Push/Custom' },
                  { feature: 'Treatment Protocols', starter: 'Basic', pro: 'Advanced', enterprise: 'Custom AI' },
                  { feature: 'Historical Data Storage', starter: '7 days', pro: '1 year', enterprise: 'Unlimited' },
                  { feature: 'API Access', starter: '—', pro: '10K calls/mo', enterprise: 'Unlimited' },
                  { feature: 'Support Response Time', starter: '48 hours', pro: '12 hours', enterprise: '1 hour (24/7)' },
                  { feature: 'Hardware Setup Assistance', starter: '—', pro: 'Video guides', enterprise: 'On-site setup' },
                  { feature: 'Team Members', starter: '1', pro: '5', enterprise: 'Unlimited' },
                  { feature: 'Custom Integrations', starter: '—', pro: '—', enterprise: '✓' },
                  { feature: 'SLA Guarantee', starter: '—', pro: '99% uptime', enterprise: '99.9% uptime' }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 pr-4 text-gray-300">{row.feature}</td>
                    <td className="py-3 px-4 text-center text-gray-400">{row.starter}</td>
                    <td className="py-3 px-4 text-center text-primary-400 font-semibold">{row.pro}</td>
                    <td className="py-3 pl-4 text-center text-purple-400 font-semibold">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Professional ROI */}
          <div className="glass p-6 rounded-2xl border-2 border-primary-500/30">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Video className="w-6 h-6 text-primary-400" />
              Professional Plan ROI
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Annual Cost:</span>
                <span className="text-white font-bold">$2,990/year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Setup Cost:</span>
                <span className="text-white">$500 (one-time)</span>
              </div>
              <div className="h-px bg-white/10 my-3"></div>
              <div className="space-y-2">
                <div className="flex justify-between text-emerald-400">
                  <span>Crop Loss Prevention (25%):</span>
                  <span className="font-bold">+$15,000</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Chemical Cost Reduction (40%):</span>
                  <span className="font-bold">+$4,000</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Labor Time Saved (20hrs/wk):</span>
                  <span className="font-bold">+$8,000</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Yield Improvement (20%):</span>
                  <span className="font-bold">+$10,000</span>
                </div>
              </div>
              <div className="h-px bg-white/10 my-3"></div>
              <div className="flex justify-between text-lg">
                <span className="text-white font-bold">Total Annual Benefit:</span>
                <span className="text-emerald-400 font-bold">$37,000</span>
              </div>
              <div className="flex justify-between text-xl">
                <span className="text-white font-bold">Net ROI:</span>
                <span className="text-gradient font-bold text-2xl">1,137%</span>
              </div>
              <p className="text-xs text-gray-500 mt-3">*Based on 100-acre farm with $60K annual revenue</p>
            </div>
          </div>

          {/* Enterprise ROI */}
          <div className="glass p-6 rounded-2xl border-2 border-purple-500/30">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Plane className="w-6 h-6 text-purple-400" />
              Enterprise Plan ROI
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Annual Cost:</span>
                <span className="text-white font-bold">$9,990/year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Setup Cost:</span>
                <span className="text-white">$2,500 (one-time)</span>
              </div>
              <div className="h-px bg-white/10 my-3"></div>
              <div className="space-y-2">
                <div className="flex justify-between text-emerald-400">
                  <span>Crop Loss Prevention (30%):</span>
                  <span className="font-bold">+$180,000</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Chemical Cost Reduction (50%):</span>
                  <span className="font-bold">+$25,000</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Labor Cost Savings (50%):</span>
                  <span className="font-bold">+$40,000</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Yield Improvement (25%):</span>
                  <span className="font-bold">+$150,000</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Insurance Savings (15%):</span>
                  <span className="font-bold">+$8,000</span>
                </div>
              </div>
              <div className="h-px bg-white/10 my-3"></div>
              <div className="flex justify-between text-lg">
                <span className="text-white font-bold">Total Annual Benefit:</span>
                <span className="text-emerald-400 font-bold">$403,000</span>
              </div>
              <div className="flex justify-between text-xl">
                <span className="text-white font-bold">Net ROI:</span>
                <span className="text-gradient font-bold text-2xl">3,126%</span>
              </div>
              <p className="text-xs text-gray-500 mt-3">*Based on 500-acre farm with $600K annual revenue</p>
            </div>
          </div>
        </motion.div>

        {/* Technical Specs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1 }}
          className="mt-12 glass p-8 rounded-3xl border-2 border-primary-500/30"
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

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-12 glass p-8 rounded-3xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'What hardware do I need for live detection?',
                a: 'For Professional plan: NVIDIA Jetson Nano ($99), IP cameras ($150-300 each). For Enterprise: Jetson Orin Nano ($399), drones with cameras ($2000-5000 each).'
              },
              {
                q: 'Can I use my existing cameras?',
                a: 'Yes! We support most IP cameras with RTSP/RTMP protocols, USB webcams, and drone-mounted cameras. Contact support for compatibility checks.'
              },
              {
                q: 'How accurate is the disease detection?',
                a: 'Starter: 95%, Professional: 99.5%, Enterprise: 99.8%. We cover 100+ plant diseases with continuous AI model improvements.'
              },
              {
                q: 'What is the setup process?',
                a: 'Professional: Video guides + remote support. Enterprise: Full on-site setup, hardware consultation, and team training included.'
              },
              {
                q: 'Can I upgrade or downgrade plans?',
                a: 'Yes! Upgrade anytime and pay prorated difference. Downgrade at end of billing cycle. Contact sales for smooth transitions.'
              },
              {
                q: 'Do you offer custom solutions?',
                a: 'Yes! Enterprise plan includes custom integrations, AI model training, and tailored workflows. Contact our sales team.'
              }
            ].map((faq, i) => (
              <div key={i} className="p-5 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <h4 className="text-white font-bold mb-2">{faq.q}</h4>
                <p className="text-sm text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
