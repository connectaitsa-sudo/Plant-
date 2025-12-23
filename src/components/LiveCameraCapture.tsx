import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Camera, X, RefreshCw, Check } from 'lucide-react'

interface LiveCameraCaptureProps {
  onCapture: (imageData: string) => void
  onClose: () => void
}

const LiveCameraCapture = ({ onCapture, onClose }: LiveCameraCaptureProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: 1280, height: 720 }
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setError(null)
    } catch (err) {
      console.error('Camera error:', err)
      setError('Unable to access camera. Please check permissions.')
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL('image/jpeg', 0.9)
        setCapturedImage(imageData)
      }
    }
  }

  const retake = () => {
    setCapturedImage(null)
  }

  const confirmCapture = () => {
    if (capturedImage) {
      onCapture(capturedImage)
      stopCamera()
      onClose()
    }
  }

  const handleClose = () => {
    stopCamera()
    onClose()
  }

  // Auto-start camera
  if (!stream && !error && !capturedImage) {
    startCamera()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-4xl w-full glass rounded-3xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-emerald-500 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Camera className="w-6 h-6 text-white" />
            <h3 className="text-xl font-bold text-white">
              {capturedImage ? 'Photo Captured!' : 'Live Camera'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/20 rounded-full transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Camera/Photo View */}
        <div className="p-6">
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
            {!capturedImage ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />
                
                {/* Camera Grid Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full grid grid-cols-3 grid-rows-3 opacity-30">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="border border-white/30" />
                    ))}
                  </div>
                </div>

                {/* Focus Frame */}
                <motion.div
                  className="absolute inset-8 border-2 border-primary-400 rounded-xl pointer-events-none"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </>
            ) : (
              <img
                src={capturedImage}
                alt="Captured plant"
                className="w-full h-full object-cover"
              />
            )}

            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                <div className="text-center p-6">
                  <p className="text-red-400 mb-4">{error}</p>
                  <button
                    onClick={startCamera}
                    className="px-6 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-all"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          {!capturedImage && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center"
            >
              <p className="text-gray-300 mb-2">
                📸 Position your plant within the frame
              </p>
              <p className="text-gray-400 text-sm">
                Make sure the affected area is clearly visible
              </p>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex justify-center space-x-4">
            {!capturedImage ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={capturePhoto}
                  disabled={!stream || !!error}
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Camera className="w-5 h-5" />
                  <span>Capture Photo</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClose}
                  className="px-8 py-4 glass text-white rounded-full font-semibold hover:bg-white/20 transition-all"
                >
                  Cancel
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmCapture}
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all flex items-center space-x-2"
                >
                  <Check className="w-5 h-5" />
                  <span>Use This Photo</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={retake}
                  className="px-8 py-4 glass text-white rounded-full font-semibold hover:bg-white/20 transition-all flex items-center space-x-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Retake</span>
                </motion.button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LiveCameraCapture
