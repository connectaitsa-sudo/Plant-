import { motion } from 'framer-motion'
import { Leaf, Github, Twitter, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ]

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Analyzer', href: '#analyzer' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Videos', href: '#videos' },
        { name: 'Info', href: '#info' }
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '#about' },
        { name: 'Team', href: '#about' },
        { name: 'Contact', href: '#cta' },
        { name: 'Testimonials', href: '#testimonials' }
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Disease Gallery', href: '#diseases' },
        { name: 'Detailed Info', href: '#info' },
        { name: 'AI Chat', href: '#analyzer' },
        { name: 'Help', href: '#cta' }
      ],
    },
  ]

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thanks for subscribing! Feature coming soon.')
  }

  return (
    <footer className="relative bg-gradient-to-b from-black to-primary-950/20 pt-16 pb-8">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent"></div>

      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2 mb-6"
            >
              <div className="relative">
                <Leaf className="w-8 h-8 text-primary-400" />
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Leaf className="w-8 h-8 text-primary-400 opacity-30" />
                </motion.div>
              </div>
              <span className="text-2xl font-bold text-gradient">PlantCure</span>
            </motion.div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Revolutionizing plant care with AI-powered disease detection and beautiful 3D visualizations.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-primary-500/20 transition-all group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-primary-400 transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        const element = document.querySelector(link.href)
                        element?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="text-gray-400 hover:text-primary-400 transition-colors inline-block hover:translate-x-1 transform duration-200 cursor-pointer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-2xl mb-12"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Get the latest updates on plant care tips and new features
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-all"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 PlantCure. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <button 
                onClick={() => alert('Privacy Policy - Feature coming soon')}
                className="text-gray-400 hover:text-primary-400 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => alert('Terms of Service - Feature coming soon')}
                className="text-gray-400 hover:text-primary-400 transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => alert('Cookie Settings - Feature coming soon')}
                className="text-gray-400 hover:text-primary-400 transition-colors cursor-pointer"
              >
                Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
    </footer>
  )
}

export default Footer
