import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Loader, CheckCircle, XCircle, Camera, AlertCircle } from 'lucide-react'
import * as openaiService from '../services/openai'
import * as geminiService from '../services/gemini'
import { PlantAnalysisResult } from '../services/ai'
import AIProviderSelector from './AIProviderSelector'

const PlantAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<PlantAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [aiProvider, setAIProvider] = useState<'openai' | 'gemini'>('openai')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB')
      return
    }

    // Read and display image
    const reader = new FileReader()
    reader.onload = async (e) => {
      const imageUrl = e.target?.result as string
      setSelectedImage(imageUrl)
      setError(null)
      setResult(null)

      // Start analysis
      await analyzeImage(imageUrl)
    }
    reader.readAsDataURL(file)
  }

  const analyzeImage = async (imageUrl: string) => {
    setAnalyzing(true)
    setError(null)

    try {
      // Convert to base64 without data URL prefix
      const base64 = imageUrl.split(',')[1]
      
      // Call appropriate AI service based on selection
      let analysisResult: PlantAnalysisResult
      if (aiProvider === 'gemini') {
        analysisResult = await geminiService.analyzePlantImage(base64)
      } else {
        analysisResult = await openaiService.analyzePlantImage(base64)
      }
      
      setResult(analysisResult)
    } catch (err) {
      console.error('Analysis error:', err)
      setError(err instanceof Error ? err.message : 'Failed to analyze image')
    } finally {
      setAnalyzing(false)
    }
  }

  const handleProviderChange = (provider: 'openai' | 'gemini') => {
    setAIProvider(provider)
    // If there's a current image, re-analyze with new provider
    if (selectedImage && !analyzing) {
      analyzeImage(selectedImage)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const resetAnalysis = () => {
    setSelectedImage(null)
    setResult(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'text-green-400 bg-green-400/20'
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20'
      case 'High': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Low': return CheckCircle
      case 'Medium': return AlertCircle
      case 'High': return XCircle
      default: return AlertCircle
    }
  }

  return (
    <section id="analyzer" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-primary-950/20 to-black"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">
            AI-Powered Analysis
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
            Diagnose Your Plant{' '}
            <span className="text-gradient">Now</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Upload a photo of your plant and get instant AI-powered disease detection
          </p>
        </motion.div>

        {/* AI Provider Selector */}
        <AIProviderSelector provider={aiProvider} onProviderChange={handleProviderChange} />

        <div className="max-w-4xl mx-auto">
          {/* Upload Area */}
          {!selectedImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-12 rounded-3xl text-center cursor-pointer hover:bg-white/20 transition-all"
              onClick={handleUploadClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-2xl flex items-center justify-center"
              >
                <Upload className="w-12 h-12 text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-4">Upload Plant Image</h3>
              <p className="text-gray-400 mb-6">
                Click to select or drag and drop an image of your plant
              </p>
              <p className="text-sm text-gray-500">
                Supports JPG, PNG (max 5MB)
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-4 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-full font-semibold inline-flex items-center space-x-2"
              >
                <Camera className="w-5 h-5" />
                <span>Choose Image</span>
              </motion.button>
            </motion.div>
          )}

          {/* Image Preview & Results */}
          <AnimatePresence mode="wait">
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass p-8 rounded-3xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Image Preview */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Uploaded Image</h3>
                    <div className="relative rounded-2xl overflow-hidden">
                      <img
                        src={selectedImage}
                        alt="Plant to analyze"
                        className="w-full h-auto object-cover"
                      />
                      {analyzing && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Loader className="w-12 h-12 text-primary-400 animate-spin" />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={resetAnalysis}
                      className="mt-4 w-full px-6 py-3 glass text-white rounded-xl hover:bg-white/20 transition-all"
                    >
                      Upload New Image
                    </button>
                  </div>

                  {/* Analysis Results */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Analysis Results</h3>
                    
                    {analyzing && (
                      <div className="flex flex-col items-center justify-center h-64 space-y-4">
                        <Loader className="w-12 h-12 text-primary-400 animate-spin" />
                        <p className="text-gray-400">Analyzing plant image...</p>
                      </div>
                    )}

                    {error && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 text-center"
                      >
                        <XCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                        <p className="text-red-300">{error}</p>
                      </motion.div>
                    )}

                    {result && !analyzing && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                        {/* Disease Name */}
                        <div className="glass p-6 rounded-2xl">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-2xl font-bold text-gradient">{result.disease}</h4>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(result.severity)}`}>
                              {result.severity}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-400">
                            {(() => {
                              const Icon = getSeverityIcon(result.severity)
                              return <Icon className="w-5 h-5" />
                            })()}
                            <span>Confidence: {result.confidence}%</span>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="glass p-6 rounded-2xl">
                          <h5 className="font-semibold text-white mb-2">Description</h5>
                          <p className="text-gray-300">{result.description}</p>
                        </div>

                        {/* Symptoms */}
                        <div className="glass p-6 rounded-2xl">
                          <h5 className="font-semibold text-white mb-3">Symptoms</h5>
                          <ul className="space-y-2">
                            {result.symptoms.map((symptom, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <span className="text-primary-400 mt-1">•</span>
                                <span className="text-gray-300">{symptom}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Treatment */}
                        <div className="glass p-6 rounded-2xl">
                          <h5 className="font-semibold text-white mb-3">Treatment Recommendations</h5>
                          <ul className="space-y-2">
                            {result.treatment.map((step, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <span className="text-primary-400 font-bold mt-1">{index + 1}.</span>
                                <span className="text-gray-300">{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default PlantAnalyzer
