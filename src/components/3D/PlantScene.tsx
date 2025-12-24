import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'

const AnimatedSphere = ({ position, color, scale }: { position: [number, number, number], color: string, scale: number }) => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 32, 32]} scale={scale} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

const PlantParticles = () => {
  const particlesCount = 200
  const positions = new Float32Array(particlesCount * 3)
  
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#22c55e"
        sizeAttenuation
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

const PlantScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 75 }} style={{ background: 'transparent' }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#22c55e" />
        
        <AnimatedSphere position={[-3, 2, 0]} color="#22c55e" scale={1.5} />
        <AnimatedSphere position={[3, -1, -2]} color="#16a34a" scale={1.2} />
        <AnimatedSphere position={[0, -2, -1]} color="#4ade80" scale={0.8} />
        <AnimatedSphere position={[-2, -1, 1]} color="#86efac" scale={1} />
        
        <PlantParticles />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  )
}

export default PlantScene
