# Contributing to PlantCure

Thank you for your interest in contributing to PlantCure! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/plant-disease-detector.git
   cd plant-disease-detector
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## Development Guidelines

### Code Style

- Use TypeScript for all new files
- Follow the existing code structure and naming conventions
- Use functional components with hooks
- Keep components small and focused
- Add proper TypeScript types for all props and functions

### Component Structure

```typescript
// Component template
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface ComponentProps {
  // Define your props here
}

const Component = ({ prop }: ComponentProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
    >
      {/* Your content */}
    </motion.div>
  )
}

export default Component
```

### Adding New Features

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test thoroughly
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Open a Pull Request

### 3D Components

When creating new 3D components:

- Use `@react-three/fiber` for React integration
- Use `@react-three/drei` helpers when available
- Keep geometries simple for performance
- Add proper lighting and materials
- Test on different devices

### Animations

For animations:

- Use Framer Motion for React animations
- Use CSS animations for simple effects
- Keep animations smooth (60fps)
- Add proper easing functions
- Consider reduced motion preferences

### Styling

- Use Tailwind CSS utility classes
- Follow the existing color scheme (green theme)
- Use glass morphism for overlays
- Ensure responsive design
- Test on multiple screen sizes

## Testing

Before submitting a PR:

1. Test on multiple browsers (Chrome, Firefox, Safari)
2. Test on mobile devices
3. Check for console errors
4. Verify animations work smoothly
5. Test 3D performance

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update documentation for any new features
3. The PR will be merged once you have the sign-off of a maintainer

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Questions about the codebase
- Suggestions for improvements

Thank you for contributing to PlantCure! 🌿
