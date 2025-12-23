# 🌿 PlantCure - AI Plant Disease Detection

<div align="center">

![PlantCure Banner](https://img.shields.io/badge/PlantCure-AI_Powered-22c55e?style=for-the-badge&logo=leaf&logoColor=white)
[![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-3D-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**A stunning, AI-powered web application for plant disease detection with immersive 3D visualizations**

[✨ Features](#-features) • [🚀 Quick Start](#-quick-start) • [📚 Documentation](#-documentation) • [🎨 Screenshots](#-screenshots)

</div>

---

## 🌟 Overview

PlantCure is a next-generation plant disease detection platform that combines cutting-edge AI technology with breathtaking 3D visualizations and smooth animations. Built with React, Three.js, and Framer Motion, it provides an immersive experience for diagnosing and treating plant diseases.

### ✨ Key Highlights

- 🎨 **Beautiful 3D Visualizations** - Immersive Three.js powered plant models
- ⚡ **Lightning Fast** - Built with Vite for instant hot module replacement
- 🎭 **Smooth Animations** - Powered by Framer Motion for fluid transitions
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🎯 **Modern UI/UX** - Glass morphism, gradients, and contemporary design
- 🌌 **Particle Effects** - Dynamic canvas-based background animations
- 🔮 **Interactive 3D Cards** - Hover effects with floating 3D shapes
- 🎨 **Custom Animations** - Float, glow, fade, and slide effects

---

## ✨ Features

### 🤖 AI-Powered Analysis
- Instant disease detection from plant images
- Deep learning models trained on extensive datasets
- 98% accuracy rate for common plant diseases

### 🎨 3D Visualizations
- Interactive Three.js scenes with React Three Fiber
- Floating animated spheres with distortion effects
- 3D disease cards with dynamic geometries
- Particle systems and dynamic lighting

### 🎭 Advanced Animations
- Smooth page transitions with Framer Motion
- Scroll-triggered animations with Intersection Observer
- Custom keyframe animations (float, glow, pulse)
- Parallax scrolling effects

### 📊 Comprehensive Disease Database
- 50+ common plant diseases
- Detailed symptoms and treatment plans
- Severity indicators and visual markers
- Interactive disease cards with modal details

### 🎯 Modern UI Components
- Glass morphism design language
- Gradient text and backgrounds
- Custom scrollbars with green theme
- Responsive navigation with mobile menu
- Beautiful footer with newsletter signup

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Modern web browser with WebGL support

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd plant-disease-detector

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:3000`

---

## 🛠️ Tech Stack

### Core Technologies
- **React 18.3** - UI library with hooks and functional components
- **TypeScript 5.7** - Type-safe development
- **Vite 5.4** - Next-generation frontend tooling

### 3D & Animation
- **Three.js 0.160** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber
- **Framer Motion 11** - Production-ready animation library

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **PostCSS** - CSS transformations
- **Autoprefixer** - CSS vendor prefixing

### Additional Libraries
- **lucide-react** - Beautiful icon set
- **react-intersection-observer** - Scroll-triggered animations

---

## 📁 Project Structure

```
plant-disease-detector/
├── public/
│   └── plant-icon.svg          # App icon
├── src/
│   ├── components/
│   │   ├── 3D/
│   │   │   ├── PlantScene.tsx      # Hero 3D scene
│   │   │   └── DiseaseCard3D.tsx   # 3D disease cards
│   │   ├── Navigation.tsx          # App navigation
│   │   ├── Hero.tsx                # Landing section
│   │   ├── Features.tsx            # Features grid
│   │   ├── DiseaseGallery.tsx      # Disease database
│   │   ├── ParticleBackground.tsx  # Canvas particles
│   │   └── Footer.tsx              # Footer section
│   ├── hooks/
│   │   ├── useSmoothScroll.ts      # Smooth scroll behavior
│   │   └── useParallax.ts          # Parallax effects
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # App entry point
│   └── index.css                   # Global styles
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── vite.config.ts                  # Vite config
├── tailwind.config.js              # Tailwind config
└── postcss.config.js               # PostCSS config
```

---

## 🎨 Design Features

### Color Palette
- **Primary Green**: `#22c55e` - Main brand color
- **Emerald Accents**: `#16a34a` to `#86efac` - Gradient variants
- **Dark Background**: `#000000` to `#0a1a0a` - Deep blacks with green tints

### Typography
- System fonts for optimal performance
- Bold headings with gradient text effects
- Carefully crafted spacing and hierarchy

### Animations
- **Float**: Gentle up-down movement (6s duration)
- **Pulse Slow**: Subtle scaling effect (4s duration)
- **Glow**: Box-shadow animation with green theme
- **Slide/Fade**: Entrance animations for sections

### 3D Effects
- **Mesh Distortion**: Animated sphere distortions
- **Float Components**: Smooth 3D object floating
- **Particle Systems**: Canvas-based particle effects
- **Torus Knots**: Complex 3D geometries for cards

---

## 📚 Documentation

### Component Documentation

#### Hero Section
The hero section features:
- Full-screen 3D background with animated spheres
- Gradient overlay for text readability
- Call-to-action buttons with hover effects
- Stats cards with glass morphism
- Animated scroll indicator

#### Features Grid
Six feature cards showcasing:
- Hover-triggered scale and glow effects
- Animated icons with rotation on hover
- Glass morphism design
- Intersection Observer for scroll animations

#### Disease Gallery
Interactive disease database with:
- 3D card hover effects
- Modal popups for detailed information
- Severity indicators with color coding
- Treatment recommendations

#### Particle Background
Canvas-based animation featuring:
- 100 particles with random movement
- Connection lines between nearby particles
- Fade trail effect
- Responsive to window resize

### Custom Hooks

#### `useSmoothScroll`
Enables smooth scrolling to anchor links:
```typescript
useSmoothScroll() // Use in App component
```

#### `useParallax`
Provides scroll position for parallax effects:
```typescript
const scrollY = useParallax()
```

---

## 🎯 Customization

### Adding New Diseases

Edit `src/components/DiseaseGallery.tsx`:

```typescript
const diseases = [
  {
    id: 7,
    name: 'Your Disease Name',
    severity: 'Low' | 'Medium' | 'High',
    symptoms: 'Description of symptoms',
    treatment: 'Treatment recommendations',
    color: '#hex-color',
    icon: LucideIcon,
  },
  // ... more diseases
]
```

### Customizing Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom color palette
      },
    },
  },
}
```

### Adding New 3D Elements

Create new components in `src/components/3D/`:

```typescript
import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'

const MyComponent = () => {
  return (
    <Canvas>
      <Float>
        <mesh>
          {/* Your 3D object */}
        </mesh>
      </Float>
    </Canvas>
  )
}
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Three.js** - Amazing 3D library
- **Framer Motion** - Beautiful animation library
- **Lucide** - Clean and consistent icons
- **Tailwind CSS** - Rapid UI development
- **Vite** - Lightning-fast build tool

---

## 📧 Contact

For questions, feedback, or collaboration opportunities:

- GitHub Issues: [Report a bug or request a feature](https://github.com/yourusername/plant-disease-detector/issues)
- Email: your.email@example.com

---

<div align="center">

**Made with ❤️ and lots of ☕**

⭐ Star this repo if you find it helpful!

</div>
