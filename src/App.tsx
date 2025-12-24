import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import DiseaseGallery from './components/DiseaseGallery'
import ParticleBackground from './components/ParticleBackground'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import About from './components/About'
import LoadingScreen from './components/LoadingScreen'
import CTA from './components/CTA'
import Testimonials from './components/Testimonials'
import PlantAnalyzer from './components/PlantAnalyzer'
import Pricing from './components/Pricing'
import ModernChatbot from './components/ModernChatbot'
import VideoTreatments from './components/VideoTreatments'
import DetailedInfo from './components/DetailedInfo'
import { useSmoothScroll } from './hooks/useSmoothScroll'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  useSmoothScroll()

  useEffect(() => {
    // Simulate loading time for dramatic effect
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => setIsLoaded(true), 100)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div className={`relative transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <ParticleBackground />
        <Navigation />
        <Hero />
        <PlantAnalyzer />
        <Features />
        <VideoTreatments />
        <DetailedInfo />
        <About />
        <Pricing />
        <DiseaseGallery />
        <Testimonials />
        <CTA />
        <Footer />
        <ModernChatbot />
      </div>
    </>
  )
}

export default App
