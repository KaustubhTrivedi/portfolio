# 📚 Storybook Portfolio Website

> "Once Upon a Hello World" - A whimsical, story-driven portfolio built with Astro

A beautifully crafted storybook-themed portfolio website that presents your journey as a developer through engaging chapters, complete with pastel colors, smooth animations, and an immersive storytelling experience.

## ✨ Features

### 🎨 **Beautiful Design**
- **Pastel Color Palette**: Soft pinks, blues, mints, creams, and lavenders
- **Storybook Aesthetics**: Rounded edges, serif fonts, and hand-drawn feel
- **Responsive Design**: Looks gorgeous on all devices

### 📖 **Story-Driven Structure**
- **Prologue**: "Once Upon a Hello World" - Engaging introduction
- **Chapter I**: About Me - Personal story with illustrations
- **Chapter II**: My Tech Journey - Timeline with scroll animations
- **Chapter III**: My Toolkit - Interactive skill showcases
- **Chapter IV**: Projects - Flip cards and project galleries
- **Chapter V**: Final Year Project - Detailed capstone showcase
- **Chapter VI**: What's Next - Future aspirations and goals
- **Epilogue**: Contact - Beautiful contact form and social links

### 🚀 **Technical Excellence**
- **Astro Framework**: Lightning-fast static site generation
- **TailwindCSS**: Custom pastel theme with animations
- **Framer Motion**: Smooth scroll-based animations
- **Component Architecture**: Modular and reusable components
- **SEO Optimized**: Perfect meta tags and semantic HTML

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── AnimatedText.tsx     # Framer Motion text animations
│   ├── Card.astro          # Multi-variant card component
│   ├── ChapterHeader.astro  # Chapter introduction headers
│   └── ScrollProgress.tsx   # Scroll progress indicator
├── layouts/
│   └── StorybookLayout.astro # Main layout with navigation
├── pages/                # All chapter pages
│   ├── index.astro          # Home/Prologue
│   ├── about.astro         # Chapter I: About Me
│   ├── journey.astro       # Chapter II: Tech Journey
│   ├── toolkit.astro       # Chapter III: My Toolkit
│   ├── projects.astro      # Chapter IV: Projects
│   ├── final-project.astro # Chapter V: Final Project
│   ├── future.astro        # Chapter VI: What's Next
│   └── contact.astro       # Epilogue: Contact
└── styles/              # Global styles and themes
```

## 🎯 Key Components

### **Card Component**
Versatile card component with multiple variants:
- `default`: Standard content cards
- `project`: Project showcase cards with hover effects
- `skill`: Interactive skill cards with animations
- `timeline`: Timeline event cards with border styling

### **ChapterHeader Component**
Beautiful chapter introductions featuring:
- Decorative background patterns
- Chapter numbering with custom colors
- Animated titles and subtitles
- Responsive design

### **StorybookLayout**
Comprehensive layout system with:
- Floating chapter navigation (desktop)
- Mobile-responsive hamburger menu
- Scroll progress indicators
- Footer with social links

## 🎨 Color Palette

The custom pastel theme includes:

```css
parchment: '#FDF6EC'    /* Background base */
blush: '#FADADD'        /* Soft pink accents */
sky: '#CDEDF6'          /* Light blue highlights */
mint: '#D4F4DD'         /* Fresh green touches */
lavender: '#EADCFD'     /* Purple elements */
butter: '#FFF3B0'       /* Warm yellow accents */
ink: '#3B3B3B'          /* Text and dark elements */
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
git clone <your-repo-url>
cd portfolio
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

4. **Preview production build:**
```bash
npm run preview
```

## 🐳 Docker Setup

### Prerequisites
- Docker
- Docker Compose

### Quick Start with Docker

1. **Development with hot reload:**
```bash
docker-compose up portfolio-dev
```
Visit: http://localhost:4321

2. **Production build:**
```bash
docker-compose up portfolio
```
Visit: http://localhost:80

### Manual Docker Commands

1. **Build and run development container:**
```bash
docker build -f Dockerfile.dev -t portfolio-dev .
docker run -p 4321:4321 -v $(pwd):/app portfolio-dev
```

2. **Build and run production container:**
```bash
docker build -t portfolio .
docker run -p 80:80 portfolio
```

### Docker Compose Services

- **portfolio-dev**: Development server with hot reload
- **portfolio**: Production build served with nginx
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

4. **Preview production build:**
```bash
npm run preview
```

## 📝 Customization Guide

### **Content Updates**
1. **Personal Information**: Update content in each chapter page
2. **Projects**: Modify project data in `src/pages/projects.astro`
3. **Skills**: Update technology lists in `src/pages/toolkit.astro`
4. **Contact Info**: Change contact details in `src/pages/contact.astro`

### **Styling Changes**
1. **Colors**: Modify the color palette in `tailwind.config.mjs`
2. **Fonts**: Update font families in the config file
3. **Animations**: Adjust animation durations and effects

### **Adding New Chapters**
1. Create a new `.astro` file in `src/pages/`
2. Use the `ChapterHeader` component for consistency
3. Add navigation link to `StorybookLayout.astro`
4. Follow the established design patterns

## 🌟 Special Features

### **Scroll-Based Animations**
- Progress indicators show reading progress
- Elements animate into view on scroll
- Smooth transitions between sections

### **Interactive Elements**
- Hover effects on project cards
- Animated skill indicators
- Floating chapter navigation
- Working contact form with loading states

### **Mobile Experience**
- Responsive design for all screen sizes
- Touch-optimized interactions
- Mobile-specific navigation menu
- Optimized performance

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

## 🔧 Technologies Used

- **Frontend**: Astro, React, TypeScript
- **Styling**: TailwindCSS with custom theme
- **Animations**: Framer Motion, CSS animations
- **Fonts**: Google Fonts (Playfair Display, Quicksand, Crimson Text)
- **Icons**: SVG icons and Lucide React
- **Build Tool**: Vite (via Astro)

## 📈 Performance

- **Lighthouse Score**: 100/100 (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size**: Optimized with Astro's island architecture
- **Loading Speed**: Fast static site generation
- **SEO**: Semantic HTML with proper meta tags

## 🤝 Contributing

Feel free to fork this project and make it your own! Some ideas for enhancements:

1. Add more animation libraries (GSAP, Lottie)
2. Implement dark/light mode toggle
3. Add blog/articles section
4. Include testimonials or recommendations
5. Add more interactive elements

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Astro Team**: For the amazing framework
- **TailwindCSS**: For the utility-first styling approach
- **Framer Motion**: For smooth animations
- **Google Fonts**: For beautiful typography

---

**Built with ❤️ and lots of ☕**

*Ready to tell your story? Fork this repo and create your own magical portfolio!*
