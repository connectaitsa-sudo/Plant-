import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'

const AnimatedShape = ({ color }: { color: string }) => {
  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={1}>
      <mesh>
        <torusKnotGeometry args={[0.5, 0.15, 100, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  )
}

const DiseaseCard3D = ({ color }: { color: string }) => {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={color} />
      <AnimatedShape color={color} />
    </Canvas>
  )
}

export default DiseaseCard3D
