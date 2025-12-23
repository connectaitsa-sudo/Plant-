# 🚀 Quick Start Guide

Get PlantCure up and running in 60 seconds!

## ⚡ Prerequisites

Ensure you have installed:
- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)

Check your versions:
```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be v9.0.0 or higher
```

## 📦 Installation

### Step 1: Navigate to Project Directory
```bash
cd /workspace
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages (~319 packages in ~20 seconds).

## 🎯 Running the Application

### Development Mode
```bash
npm run dev
```

The application will start at: **http://localhost:3000**

Open your browser and visit the URL. You should see:
- ✅ Beautiful animated loading screen (2 seconds)
- ✅ 3D hero section with floating spheres
- ✅ Smooth animations throughout
- ✅ Interactive components

### Production Build
```bash
npm run build
```

Creates optimized production build in the `dist` folder.

### Preview Production Build
```bash
npm run preview
```

Preview the production build locally before deploying.

## 🎨 What You'll See

### 1. Loading Screen (0-2s)
- Animated PlantCure logo
- Rotating leaf icons
- Loading progress bar

### 2. Hero Section
- Full-screen 3D background with animated spheres
- Gradient text effects
- Call-to-action buttons
- Live statistics

### 3. Features Section
- 6 animated feature cards
- Rotating icons on hover
- Glass morphism design
- Smooth scroll animations

### 4. About Section
- Company information
- Interactive statistics grid
- Animated checkmarks
- Beautiful gradients

### 5. Disease Gallery
- 6 plant diseases with details
- 3D hover effects
- Modal popups
- Treatment information

### 6. Testimonials
- Customer reviews
- 5-star ratings
- Emoji avatars
- Glass card design

### 7. CTA Section
- Large 3D sphere animation
- Multiple call-to-actions
- Feature highlights
- Stats showcase

### 8. Footer
- Newsletter signup
- Social media links
- Site navigation
- Legal links

## 🎮 Interactive Features

Try these interactions:

1. **Hover over feature cards** → Watch them glow and lift
2. **Click disease cards** → See detailed modal popups
3. **Hover navigation items** → Underline animation
4. **Scroll through page** → Elements animate into view
5. **Click nav links** → Smooth scroll to sections
6. **Hover buttons** → Scale and shadow effects

## 🛠️ Development Tips

### Hot Module Replacement (HMR)
Changes you make to the code will instantly reflect in the browser without a full reload!

### File Structure
```
src/
├── components/       → React components
│   ├── 3D/          → Three.js components
│   ├── Hero.tsx     → Landing section
│   ├── Features.tsx → Features grid
│   └── ...
├── hooks/           → Custom React hooks
├── App.tsx          → Main app component
├── main.tsx         → Entry point
└── index.css        → Global styles
```

### Making Changes

**1. Change Colors:**
Edit `tailwind.config.js` → Update the `primary` color palette

**2. Add New Diseases:**
Edit `src/components/DiseaseGallery.tsx` → Add to `diseases` array

**3. Modify Animations:**
Edit component files → Adjust Framer Motion props

**4. Change Text:**
Edit component files → Update JSX content

## 📱 Testing

### Browser Testing
Test in these browsers:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

### Responsive Testing
Resize your browser or use dev tools to test:
- 📱 Mobile: < 768px
- 📱 Tablet: 768-1024px
- 💻 Desktop: > 1024px

### Performance Testing
Open Chrome DevTools:
1. Press F12
2. Go to "Performance" tab
3. Record and analyze
4. Should see 60fps animations

## 🎯 Common Issues

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- --port 3001
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check TypeScript errors
npx tsc --noEmit

# Check for linting issues
npm run lint
```

### 3D Not Rendering
- Ensure WebGL is enabled in your browser
- Update graphics drivers
- Try different browser

## 🚀 Next Steps

### Customize the Project
1. **Branding**: Replace "PlantCure" with your name
2. **Colors**: Modify Tailwind config for your theme
3. **Content**: Update text, images, and data
4. **Features**: Add/remove sections as needed

### Deploy to Production
See `DEPLOYMENT.md` for detailed deployment instructions:
- Vercel (easiest)
- Netlify
- GitHub Pages
- AWS Amplify
- Docker

### Add Real Functionality
- Integrate AI model API
- Add image upload
- Create user accounts
- Build database
- Add payment system

## 📚 Learn More

- `README.md` → Full project documentation
- `PROJECT_SHOWCASE.md` → Design details
- `DEPLOYMENT.md` → Deployment guide
- `CONTRIBUTING.md` → Contribution guidelines

## 🆘 Need Help?

1. Check the console for errors (F12)
2. Read error messages carefully
3. Check file paths and imports
4. Ensure all dependencies installed
5. Try restarting dev server

## 🎉 Success Checklist

After running `npm run dev`, you should see:
- ✅ No errors in console
- ✅ Application loads at localhost:3000
- ✅ Loading screen appears
- ✅ 3D animations render
- ✅ All sections visible
- ✅ Smooth scrolling works
- ✅ Hover effects work
- ✅ Responsive on mobile

## 💡 Pro Tips

1. **Keep dev server running** while editing
2. **Save files** to see instant updates (HMR)
3. **Use browser dev tools** for debugging
4. **Test mobile view** frequently
5. **Clear browser cache** if issues persist

---

## 🎯 Quick Commands Reference

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

---

**That's it! You're ready to go! 🚀**

Enjoy your beautiful plant disease detection application!

For any issues, refer to the comprehensive README.md file.

**Happy coding! 🌿**
