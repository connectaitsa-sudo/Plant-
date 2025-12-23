import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, Clock, Eye } from 'lucide-react'
import { useState } from 'react'

const videos = [
  {
    id: 1,
    title: 'How to Treat Powdery Mildew',
    duration: '8:45',
    views: '125K',
    thumbnail: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
    description: 'Complete guide to identifying and treating powdery mildew on plants',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 2,
    title: 'Leaf Spot Disease Treatment',
    duration: '6:30',
    views: '98K',
    thumbnail: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=600&h=400&fit=crop',
    description: 'Step-by-step treatment for various leaf spot diseases',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 3,
    title: 'Root Rot Prevention & Treatment',
    duration: '10:15',
    views: '156K',
    thumbnail: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&h=400&fit=crop',
    description: 'Learn how to prevent and treat root rot in houseplants',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 4,
    title: 'Natural Fungicide Solutions',
    duration: '7:20',
    views: '203K',
    thumbnail: 'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=600&h=400&fit=crop',
    description: 'DIY organic fungicides for treating plant diseases',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 5,
    title: 'Pest Control for Healthy Plants',
    duration: '9:10',
    views: '187K',
    thumbnail: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&h=400&fit=crop',
    description: 'Effective pest control methods for disease prevention',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 6,
    title: 'Plant Disease Early Detection',
    duration: '5:45',
    views: '142K',
    thumbnail: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&h=400&fit=crop',
    description: 'How to spot plant diseases before they spread',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
]

const VideoTreatments = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null)

  return (
    <section id="videos" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-primary-950/10 to-black"></div>
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow"></div>

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
            Video Treatments
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6"
          >
            Learn from{' '}
            <span className="text-gradient">Video Tutorials</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Watch step-by-step video guides for treating common plant diseases
          </motion.p>
        </motion.div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => setSelectedVideo(video)}
              className="group cursor-pointer"
            >
              <div className="glass rounded-2xl overflow-hidden hover:bg-white/20 transition-all">
                {/* Thumbnail */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-emerald-500 flex items-center justify-center glow-green"
                    >
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </motion.div>
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/80 rounded-full flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-white" />
                    <span className="text-white text-xs font-semibold">{video.duration}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{video.views} views</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="glass p-4 rounded-3xl max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-white">{selectedVideo.title}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`${selectedVideo.videoUrl}?autoplay=1&cc_load_policy=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="absolute top-4 right-4 flex items-center space-x-2 text-xs">
                <span className="px-2 py-1 bg-black/80 rounded text-white">🔊 Audio</span>
                <span className="px-2 py-1 bg-black/80 rounded text-white">CC</span>
              </div>
            </div>
            <p className="text-gray-300 mt-4">{selectedVideo.description}</p>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default VideoTreatments
