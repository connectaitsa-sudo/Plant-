import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Loader, CheckCircle, XCircle, Camera, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import * as openaiService from '../services/openai'
import { PlantAnalysisResult } from '../services/ai'
import LiveCameraCapture from './LiveCameraCapture'
import DetailedInfoModal from './DetailedInfoModal'
import { findDiseaseVideo } from '../data/diseaseVideos'

const PlantAnalyzer = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<PlantAnalysisResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showDetails, setShowDetails] = useState(false)
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
      setShowDetails(false)
      
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
    // Don't auto-show video - let user click the button
  }

  const analyzeImage = async (imageUrl: string): Promise<PlantAnalysisResult | null> => {
    setAnalyzing(true)
    setError(null)

    try {
      // Convert to base64 without data URL prefix
      const base64 = imageUrl.split(',')[1]
      
      // Always use OpenAI for analysis
      const analysisResult = await openaiService.analyzePlantImage(base64)
      
      return analysisResult
    } catch (err) {
      console.error('Analysis error:', err)
      setError(err instanceof Error ? err.message : 'Failed to analyze image')
      return null
    } finally {
      setAnalyzing(false)
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
    setShowDetails(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleCameraCapture = async (imageData: string) => {
    setSelectedImages([imageData])
    setCurrentImageIndex(0)
    setResults([])
    setShowDetails(false)
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
    <section id="analyzer" className="relative py-14 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-primary-950/20 to-black"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">
            AI-Powered Analysis
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
            Diagnose Your Plant{' '}
            <span className="text-primary-400">Now</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Upload a photo of your plant and get instant AI-powered disease detection
          </p>
        </motion.div>

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
                        className="space-y-5"
                      >
                        {/* Plant & Disease Header - Enhanced */}
                        <div className="glass p-6 rounded-2xl border-2 border-primary-500/40 bg-gradient-to-br from-primary-500/10 to-emerald-500/10">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex-1">
                              {/* Plant Name */}
                              <div className="mb-4">
                                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Your Plant Species</p>
                                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                                  <span className="text-3xl">🌿</span>
                                  {currentResult.plant || 'Unknown Plant'}
                                </h3>
                              </div>
                              
                              {/* Disease Name */}
                              <div>
                                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Detected Disease</p>
                                <h4 className="text-xl sm:text-2xl font-bold text-gradient mb-2">{currentResult.disease}</h4>
                              </div>
                            </div>
                            
                            {/* Severity Badge */}
                            <div className="flex flex-col items-end gap-2">
                              <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${getSeverityColor(currentResult.severity)}`}>
                                {currentResult.severity}
                              </span>
                              <div className="flex items-center space-x-1.5 text-gray-300 bg-black/30 px-3 py-1.5 rounded-full">
                                {(() => {
                                  const Icon = getSeverityIcon(currentResult.severity)
                                  return <Icon className="w-4 h-4" />
                                })()}
                                <span className="text-xs font-semibold">{currentResult.confidence}%</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Quick Action Button */}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              console.log('Details button clicked!', currentResult)
                              setShowDetails(true)
                            }}
                            className="w-full mt-3 px-6 py-3.5 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-primary-500/50 transition-all flex items-center justify-center space-x-2 cursor-pointer group"
                          >
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>View Complete Treatment Details</span>
                          </motion.button>
                        </div>

                        {/* Quick Info Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Description Card */}
                          <div className="glass p-5 rounded-xl hover:bg-white/10 transition-all">
                            <div className="flex items-center space-x-2 mb-3">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <h5 className="font-bold text-white">Description</h5>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">{currentResult.description}</p>
                          </div>

                          {/* Symptoms Card */}
                          <div className="glass p-5 rounded-xl hover:bg-white/10 transition-all">
                            <div className="flex items-center space-x-2 mb-3">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                              </div>
                              <h5 className="font-bold text-white">Key Symptoms</h5>
                            </div>
                            <ul className="space-y-1.5">
                              {currentResult.symptoms.slice(0, 3).map((symptom: string, index: number) => (
                                <li key={index} className="flex items-start space-x-2 text-sm">
                                  <span className="text-primary-400 mt-0.5">•</span>
                                  <span className="text-gray-300">{symptom}</span>
                                </li>
                              ))}
                              {currentResult.symptoms.length > 3 && (
                                <li className="text-xs text-primary-400 font-semibold mt-2">
                                  +{currentResult.symptoms.length - 3} more (view in video)
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>

                        {/* Treatment Preview */}
                        <div className="glass p-5 rounded-xl border-2 border-emerald-500/30 hover:border-emerald-500/50 transition-all">
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <h5 className="font-bold text-white">Quick Treatment Steps</h5>
                          </div>
                          <ul className="space-y-2">
                            {currentResult.treatment.slice(0, 3).map((step: string, index: number) => (
                              <li key={index} className="flex items-start space-x-2.5">
                                <span className="w-5 h-5 rounded-full bg-gradient-to-r from-primary-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-xs font-bold text-white">{index + 1}</span>
                                </span>
                                <span className="text-sm text-gray-300">{step}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="text-xs text-gray-400 mt-3 flex items-center space-x-1">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                            </svg>
                            <span>Watch full treatment demonstration video for complete steps</span>
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Detailed Info Modal */}
          {showDetails && currentResult && (
            <DetailedInfoModal
              diseaseVideo={findDiseaseVideo(currentResult.disease)}
              plantName={currentResult.plant}
              onClose={() => setShowDetails(false)}
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
