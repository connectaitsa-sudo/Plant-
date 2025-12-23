import { motion } from 'framer-motion'
import { Brain, Sparkles } from 'lucide-react'

interface AIProviderSelectorProps {
  provider: 'openai' | 'gemini'
  onProviderChange: (provider: 'openai' | 'gemini') => void
}

const AIProviderSelector = ({ provider, onProviderChange }: AIProviderSelectorProps) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      <span className="text-gray-400 text-sm">AI Provider:</span>
      
      <div className="flex glass rounded-full p-1">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onProviderChange('openai')}
          className={`px-6 py-2 rounded-full flex items-center space-x-2 transition-all ${
            provider === 'openai'
              ? 'bg-gradient-to-r from-primary-500 to-emerald-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span className="font-semibold">OpenAI</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onProviderChange('gemini')}
          className={`px-6 py-2 rounded-full flex items-center space-x-2 transition-all ${
            provider === 'gemini'
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="font-semibold">Gemini</span>
        </motion.button>
      </div>
    </div>
  )
}

export default AIProviderSelector
