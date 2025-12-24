import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Loader, CheckCircle, XCircle, Camera, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import * as openaiService from '../services/openai'
import * as geminiService from '../services/gemini'
import { PlantAnalysisResult } from '../services/ai'
import AIProviderSelector from './AIProviderSelector'
import AIVideoTreatment from './AIVideoTreatment'
import LiveCameraCapture from './LiveCameraCapture'
import { findDiseaseVideo } from '../data/diseaseVideos'

const PlantAnalyzer = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<PlantAnalysisResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [aiProvider, setAIProvider] = useState<'openai' | 'gemini'>('openai')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showVideo, setShowVideo] = useState(false)
  const [showCamera, setShowCamera] = useState(false)

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const validImages: string[] = []
    const errors: string[] = []

    // Process all selected files
    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      // Validate file type
      if (!file.type.startsWith('image/')) {
        errors.push(`${file.name}: Not a valid image file`)
        continue
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        errors.push(`${file.name}: Size exceeds 5MB`)
        continue
      }

      // Read image
      try {
        const imageUrl = await readFileAsDataURL(file)
        validImages.push(imageUrl)
      } catch (err) {
        errors.push(`${file.name}: Failed to read`)
      }
    }

    if (errors.length > 0) {
      setError(errors.join(', '))
    } else {
      setError(null)
    }

    if (validImages.length > 0) {
      setSelectedImages(validImages)
      setCurrentImageIndex(0)
      setResults([])
      setShowVideo(false)
      
      // Analyze all images
      await analyzeAllImages(validImages)
    }
  }

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const analyzeAllImages = async (images: string[]) => {
    const analysisResults: PlantAnalysisResult[] = []

    for (let i = 0; i < images.length; i++) {
      setCurrentImageIndex(i)
      const result = await analyzeImage(images[i])
      if (result) {
        analysisResults.push(result)
      }
    }

    setResults(analysisResults)
    setCurrentImageIndex(0)
    
    // Show video for first result
    if (analysisResults.length > 0) {
      setShowVideo(true)
    }
  }

  const analyzeImage = async (imageUrl: string): Promise<PlantAnalysisResult | null> => {
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
      
      return analysisResult
    } catch (err) {
      console.error('Analysis error:', err)
      setError(err instanceof Error ? err.message : 'Failed to analyze image')
      return null
    } finally {
      setAnalyzing(false)
    }
  }

  const handleProviderChange = (provider: 'openai' | 'gemini') => {
    setAIProvider(provider)
    // If there are images, re-analyze with new provider
    if (selectedImages.length > 0 && !analyzing) {
      analyzeAllImages(selectedImages)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const resetAnalysis = () => {
    setSelectedImages([])
    setResults([])
    setError(null)
    setCurrentImageIndex(0)
    setShowVideo(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleCameraCapture = async (imageData: string) => {
    setSelectedImages([imageData])
    setCurrentImageIndex(0)
    setResults([])
    setShowVideo(false)
    await analyzeAllImages([imageData])
  }

  const selectImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const currentImage = selectedImages[currentImageIndex]
  const currentResult = results[currentImageIndex]

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
    <section id="analyzer" className="relative py-20 overflow-hidden">
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
          {selectedImages.length === 0 && (
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
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                />
              
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-2xl flex items-center justify-center"
              >
                <Upload className="w-12 h-12 text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-4">Upload or Capture Plant Images</h3>
              <p className="text-gray-300 mb-6">
                Click to select multiple images or use live camera to capture
              </p>
              <p className="text-sm text-gray-400">
                Supports JPG, PNG (max 5MB per image)
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleUploadClick()
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-full font-semibold inline-flex items-center space-x-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>Choose Images</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowCamera(true)
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold inline-flex items-center space-x-2"
                >
                  <Camera className="w-5 h-5" />
                  <span>Live Camera</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Image Gallery & Results */}
          <AnimatePresence mode="wait">
            {selectedImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass p-8 rounded-3xl"
              >
                {/* Image Thumbnails */}
                {selectedImages.length > 1 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white mb-3">Uploaded Images ({selectedImages.length})</h3>
                    <div className="flex space-x-3 overflow-x-auto pb-2">
                      {selectedImages.map((img, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => selectImage(index)}
                          className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                            currentImageIndex === index ? 'border-primary-400' : 'border-white/20'
                          }`}
                        >
                          <img src={img} alt={`Plant ${index + 1}`} className="w-full h-full object-cover" />
                          {currentImageIndex === index && (
                            <div className="absolute inset-0 bg-primary-500/30 flex items-center justify-center">
                              <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Image Preview */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">Image {currentImageIndex + 1} of {selectedImages.length}</h3>
                      {selectedImages.length > 1 && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => selectImage(Math.max(0, currentImageIndex - 1))}
                            disabled={currentImageIndex === 0}
                            className="p-2 glass rounded-lg hover:bg-white/20 disabled:opacity-50 transition-all"
                          >
                            <ChevronLeft className="w-5 h-5 text-white" />
                          </button>
                          <button
                            onClick={() => selectImage(Math.min(selectedImages.length - 1, currentImageIndex + 1))}
                            disabled={currentImageIndex === selectedImages.length - 1}
                            className="p-2 glass rounded-lg hover:bg-white/20 disabled:opacity-50 transition-all"
                          >
                            <ChevronRight className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="relative rounded-2xl overflow-hidden">
                      <img
                        src={currentImage}
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
                      Upload New Images
                    </button>
                  </div>

                  {/* Analysis Results */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Analysis Results</h3>
                    
                    {analyzing && (
                      <div className="flex flex-col items-center justify-center h-64 space-y-4">
                        <Loader className="w-12 h-12 text-primary-400 animate-spin" />
                        <p className="text-gray-300">Analyzing plant image...</p>
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

                    {currentResult && !analyzing && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                        {/* Plant & Disease Name */}
                        <div className="glass p-6 rounded-2xl border-2 border-primary-500/30">
                          {/* Plant Name */}
                          <div className="mb-4 pb-4 border-b border-white/10">
                            <p className="text-sm text-gray-400 mb-1">Your Plant:</p>
                            <h3 className="text-3xl font-bold text-white tracking-tight">
                              🌿 {currentResult.plant || 'Unknown Plant'}
                            </h3>
                          </div>
                          
                          {/* Disease Name */}
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="text-sm text-gray-400 mb-1">Detected Disease:</p>
                              <h4 className="text-2xl font-bold text-gradient">{currentResult.disease}</h4>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-bold ${getSeverityColor(currentResult.severity)}`}>
                              {currentResult.severity}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-300">
                            {(() => {
                              const Icon = getSeverityIcon(currentResult.severity)
                              return <Icon className="w-5 h-5" />
                            })()}
                            <span className="font-semibold">Confidence: {currentResult.confidence}%</span>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="glass p-6 rounded-2xl">
                          <h5 className="font-semibold text-white mb-2">Description</h5>
                          <p className="text-gray-300">{currentResult.description}</p>
                        </div>

                        {/* Symptoms */}
                        <div className="glass p-6 rounded-2xl">
                          <h5 className="font-semibold text-white mb-3">Symptoms</h5>
                          <ul className="space-y-2">
                            {currentResult.symptoms.map((symptom: string, index: number) => (
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
                            {currentResult.treatment.map((step: string, index: number) => (
                              <li key={index} className="flex items-start space-x-2">
                                <span className="text-primary-400 font-bold mt-1">{index + 1}.</span>
                                <span className="text-gray-300">{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Watch Video Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowVideo(true)}
                          className="w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all flex items-center justify-center space-x-2"
                        >
                          <Camera className="w-5 h-5" />
                          <span>Watch Treatment Video & Detailed Info</span>
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Video Treatment */}
          {showVideo && currentResult && (
            <AIVideoTreatment
              diseaseVideo={findDiseaseVideo(currentResult.disease)}
              plantName={currentResult.plant}
              onClose={() => setShowVideo(false)}
            />
          )}

          {/* Live Camera Capture */}
          {showCamera && (
            <LiveCameraCapture
              onCapture={handleCameraCapture}
              onClose={() => setShowCamera(false)}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default PlantAnalyzer
