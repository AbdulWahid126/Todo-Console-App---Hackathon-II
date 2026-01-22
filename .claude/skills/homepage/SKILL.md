# Homepage Skill Documentation

## Overview
This document provides specifications for creating a modern, visually stunning homepage with 3D elements, smooth animations, and contemporary web design patterns. The homepage should create an immersive first impression that reflects cutting-edge design trends.

## Design Philosophy

### Core Principles
- **Immersive Experience**: Use 3D elements, parallax effects, and depth to create engagement
- **Smooth Interactions**: Every animation should feel fluid and purposeful
- **Visual Hierarchy**: Guide users naturally through the content
- **Performance First**: Beautiful but optimized for fast loading
- **Modern Aesthetic**: Dark theme with vibrant accents, glassmorphism, and gradient effects

### Visual Style Reference
Based on modern SaaS landing pages like Halo AI Studio:
- Dark, sophisticated color palette
- Strategic use of blue/cyan gradients
- Large, bold typography with gradient text effects
- Floating cards with glass effects
- Subtle 3D transforms and parallax scrolling
- Ambient lighting effects and glows

## Technical Stack

### Core Technologies
```typescript
- Next.js 16 (App Router)
- TypeScript
- Three.js / React Three Fiber (for 3D elements)
- Framer Motion (for animations)
- Tailwind CSS (for styling)
- Intersection Observer API (for scroll animations)
```

### Required Dependencies
```json
{
  "dependencies": {
    "next": "^16.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.263.0"
  }
}
```

## Component Structure

### File Organization
```
app/
├── page.tsx                 # Main homepage
└── components/
    ├── homepage/
    │   ├── Hero.tsx         # Hero section with 3D background
    │   ├── Header.tsx       # Navigation header
    │   ├── Footer.tsx       # Footer section
    │   ├── Features.tsx     # Features showcase
    │   ├── Stats.tsx        # Statistics/metrics section
    │   ├── Testimonials.tsx # Customer reviews
    │   ├── CTA.tsx          # Call-to-action section
    │   ├── Pricing.tsx      # Pricing cards (optional)
    │   └── 3d/
    │       ├── Scene3D.tsx      # Main 3D scene
    │       ├── FloatingCards.tsx # 3D floating cards
    │       └── ParticleField.tsx # Particle effects
    └── ui/
        ├── Button.tsx       # Reusable button component
        ├── Card.tsx         # Glass card component
        └── GradientText.tsx # Gradient text effect
```

## Section Specifications

### 1. Header Component

**Location**: Sticky at top, transparent with blur backdrop

**Features**:
- Logo on the left
- Navigation menu (center or right)
- CTA button (e.g., "Get Started", "Sign In")
- Mobile hamburger menu
- Scroll-triggered blur background
- Smooth show/hide on scroll

**Example Structure**:
```typescript
interface HeaderProps {
  transparent?: boolean;
  fixed?: boolean;
}

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];
```

**Styling**:
```css
- Height: 80px
- Background: rgba(10, 14, 26, 0.8) with backdrop-blur
- Border-bottom: 1px solid rgba(255, 255, 255, 0.1)
- z-index: 1000
- Transition: all 0.3s ease
```

### 2. Hero Section

**Purpose**: Main landing area with attention-grabbing 3D visuals

**Features**:
- Full viewport height (100vh)
- Large headline with gradient text effect
- Subheading/description
- Primary and secondary CTA buttons
- 3D background scene (abstract shapes, particles, or product visualization)
- Parallax scrolling effect
- Smooth scroll indicator/arrow

**Content Structure**:
```typescript
interface HeroContent {
  headline: string;          // "Build Amazing TODO Apps"
  subheadline: string;       // "The modern way to manage tasks"
  description: string;       // Supporting text
  primaryCTA: CTAButton;     // "Get Started Free"
  secondaryCTA?: CTAButton;  // "Watch Demo"
}
```

**3D Elements**:
- Floating geometric shapes (cubes, spheres, toruses)
- Particle field background
- Subtle rotation animations
- Mouse parallax interaction
- Gradient lighting effects

**Typography**:
```css
- Headline: 4rem - 6rem, font-weight: 800
- Gradient: linear-gradient(to right, #fff, #60a5fa, #3b82f6)
- Subheadline: 1.5rem - 2rem, opacity: 0.9
- Line-height: 1.2 for headlines
```

### 3. Features Section

**Layout**: Grid-based feature cards with icons and descriptions

**Features**:
- 3 or 6 feature cards in responsive grid
- Icon or illustration for each feature
- Title and description
- Hover effects (lift, glow, scale)
- Stagger animation on scroll
- Optional: Bento grid layout for varied card sizes

**Card Design**:
```typescript
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient?: string;
}

const features: Feature[] = [
  {
    icon: <CheckIcon />,
    title: "Easy Task Management",
    description: "Create, organize, and track tasks effortlessly",
    gradient: "from-blue-500 to-cyan-500"
  },
  // ... more features
];
```

**Card Styling**:
```css
- Background: Glass effect (rgba(255, 255, 255, 0.05))
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border-radius: 1rem
- Padding: 2rem
- Backdrop-filter: blur(10px)
- Box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3)
- Hover: transform: translateY(-8px)
- Transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

### 4. Stats Section

**Purpose**: Display impressive metrics/achievements

**Layout**: 3-4 stat cards in a row with large numbers

**Structure**:
```typescript
interface Stat {
  value: string;        // "10K+"
  label: string;        // "Active Users"
  description?: string; // "Growing daily"
  icon?: React.ReactNode;
}

const stats: Stat[] = [
  { value: "10K+", label: "Active Users" },
  { value: "50K+", label: "Tasks Completed" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" }
];
```

**Animation**:
- Counter animation on scroll into view
- Gradient number effect
- Pulse/glow on hover

### 5. Testimonials Section

**Layout**: Carousel or grid of testimonial cards

**Features**:
- Customer photo/avatar
- Name and role
- Company logo (optional)
- Quote/review text
- Star rating
- Auto-rotating carousel (optional)

**Card Structure**:
```typescript
interface Testimonial {
  author: string;
  role: string;
  company?: string;
  avatar: string;
  content: string;
  rating: number;
}
```

**Design**:
- Cards with glass effect
- Larger quote marks as decorative element
- Subtle animation on card change
- Navigation dots or arrows

### 6. Pricing Section (Optional)

**Layout**: 3 pricing tiers in cards

**Features**:
- Plan name and price
- Feature list with checkmarks
- Highlight popular/recommended plan
- CTA button per plan
- Toggle for monthly/yearly pricing

**Card Structure**:
```typescript
interface PricingPlan {
  name: string;           // "Basic", "Pro", "Enterprise"
  price: number;
  period: string;         // "/month"
  description: string;
  features: string[];
  highlighted?: boolean;  // Popular badge
  cta: string;           // "Get Started"
}
```

**Highlighted Plan**:
- Larger scale (scale: 1.05)
- Distinct border/glow effect
- "Most Popular" badge
- Different background gradient

### 7. Call-to-Action Section

**Purpose**: Final conversion section before footer

**Features**:
- Bold headline
- Supporting text
- Primary CTA button
- Background: Gradient or 3D element
- Full-width section with padding

**Design**:
```css
- Background: Radial gradient with brand colors
- Text: Center-aligned, white
- Button: Large, prominent, with hover effect
- Optional: Floating 3D element in background
```

### 8. Footer Component

**Layout**: Multi-column footer with site map and info

**Sections**:
- Company info and logo
- Navigation links (grouped by category)
- Social media icons
- Newsletter signup
- Legal links (Privacy, Terms)
- Copyright notice

**Structure**:
```typescript
const footerLinks = {
  product: ['Features', 'Pricing', 'FAQ'],
  company: ['About', 'Blog', 'Careers'],
  resources: ['Documentation', 'Help Center', 'Contact'],
  legal: ['Privacy Policy', 'Terms of Service']
};
```

**Styling**:
```css
- Background: Darker than main (#050810)
- Border-top: 1px solid rgba(255, 255, 255, 0.1)
- Padding: 4rem 0 2rem
- Grid: 4 columns on desktop, stack on mobile
```

## 3D Components

### Scene3D.tsx

**Purpose**: Main 3D canvas background for hero section

**Implementation**:
```typescript
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';

export const Scene3D = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Floating geometric shapes */}
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[-2, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial 
              color="#3b82f6" 
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Float>
        
        {/* Add more shapes */}
        
        {/* Particle field */}
        <ParticleField />
      </Canvas>
    </div>
  );
};
```

**Features**:
- Ambient and directional lighting
- Floating animation for shapes
- Mouse parallax interaction
- Gradient materials with metalness
- Performance optimization (limit particles)

### FloatingCards.tsx

**Purpose**: 3D floating card effect for features/benefits

**Features**:
- Cards that rotate on mouse hover
- Depth effect with shadows
- Smooth 3D transforms
- Interactive tilt based on mouse position

**Implementation Pattern**:
```typescript
const [rotateX, setRotateX] = useState(0);
const [rotateY, setRotateY] = useState(0);

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  
  setRotateX((y - 0.5) * 20);
  setRotateY((x - 0.5) * -20);
};

// Apply transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg)
```

### ParticleField.tsx

**Purpose**: Animated particle background

**Features**:
- 100-200 particles floating in 3D space
- Slow drift animation
- Depth-based opacity
- Connected lines between nearby particles (optional)
- Responsive to mouse movement

## Animation Patterns

### Scroll Animations

Use Intersection Observer or Framer Motion's scroll animations:

```typescript
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Usage
<motion.div
  variants={fadeInUp}
  initial="initial"
  whileInView="animate"
  viewport={{ once: true, amount: 0.3 }}
>
  {/* Content */}
</motion.div>
```

### Hover Effects

```typescript
const cardHover = {
  scale: 1.05,
  y: -8,
  transition: { duration: 0.3 }
};

<motion.div whileHover={cardHover}>
  {/* Card content */}
</motion.div>
```

### Parallax Scrolling

```typescript
import { useScroll, useTransform, motion } from 'framer-motion';

const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

<motion.div style={{ y }}>
  {/* Parallax content */}
</motion.div>
```

## Color System

### Primary Palette
```css
:root {
  /* Backgrounds */
  --bg-primary: #0a0e1a;
  --bg-secondary: #0f1419;
  --bg-tertiary: #1a1f2e;
  
  /* Accent Colors */
  --accent-blue: #3b82f6;
  --accent-cyan: #06b6d4;
  --accent-purple: #8b5cf6;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-blue: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
  --gradient-purple: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
  
  /* Text */
  --text-primary: #ffffff;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  
  /* Glass Effect */
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
}
```

### Gradient Text Effect
```css
.gradient-text {
  background: linear-gradient(to right, #fff, #60a5fa, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

## Responsive Design

### Breakpoints
```css
/* Mobile First */
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: 1024px - 1280px
- Large: > 1280px
```

### Component Adaptations

**Header**:
- Mobile: Hamburger menu, simplified logo
- Desktop: Full navigation bar

**Hero**:
- Mobile: Stack content, reduce 3D complexity
- Desktop: Side-by-side layout with full 3D

**Features**:
- Mobile: Single column
- Tablet: 2 columns
- Desktop: 3 columns

**Footer**:
- Mobile: Stack all sections
- Desktop: Multi-column grid

## Performance Optimization

### 3D Performance
```typescript
// Reduce particle count on mobile
const particleCount = isMobile ? 50 : 150;

// Use lower quality shadows
<Canvas shadows="basic">

// Implement LOD (Level of Detail)
// Simplify 3D models on mobile

// Lazy load 3D components
const Scene3D = dynamic(() => import('./Scene3D'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});
```

### Image Optimization
```typescript
import Image from 'next/image';

<Image
  src="/hero-image.png"
  alt="Hero"
  width={1200}
  height={800}
  priority
  quality={85}
/>
```

### Code Splitting
```typescript
// Lazy load below-fold sections
const Testimonials = dynamic(() => import('./Testimonials'));
const Pricing = dynamic(() => import('./Pricing'));
```

## Accessibility

### Requirements
- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus visible styles
- Reduced motion support
- Alt text for images
- Sufficient color contrast

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Keyboard Navigation
```typescript
// Ensure all interactive elements are keyboard accessible
<button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
```

## Content Guidelines

### Hero Section
- **Headline**: Clear value proposition (6-10 words)
- **Subheadline**: Expand on the value (15-25 words)
- **CTA**: Action-oriented ("Start Building", "Try Free", "Get Started")

### Features Section
- **Title**: Benefit-focused (3-5 words)
- **Description**: Explain the benefit (10-20 words)
- **Icons**: Simple, recognizable, consistent style

### Testimonials
- **Quote**: Authentic, specific results (20-50 words)
- **Author**: Name, role, company
- **Photo**: Professional headshot

## Example Homepage Flow

### Section Order
1. **Header** (Sticky)
2. **Hero** (Full viewport, 3D background)
3. **Stats** (Social proof metrics)
4. **Features** (Main benefits, 3-6 cards)
5. **Testimonials** (Customer validation)
6. **Pricing** (Optional, tiered plans)
7. **CTA** (Final conversion push)
8. **Footer** (Navigation & info)

### Scroll Experience
- Smooth scroll behavior
- Parallax effects on hero
- Fade-in animations on scroll
- Sticky header with blur
- Scroll progress indicator (optional)
- Back to top button (appears after scrolling)

## Implementation Checklist

### Phase 1: Foundation
- [ ] Set up Next.js project with TypeScript
- [ ] Install dependencies (Three.js, Framer Motion, etc.)
- [ ] Create color system and CSS variables
- [ ] Build responsive layout grid
- [ ] Implement Header component
- [ ] Implement Footer component

### Phase 2: Core Sections
- [ ] Build Hero section with 3D background
- [ ] Create Features section with cards
- [ ] Implement Stats section
- [ ] Add Testimonials section
- [ ] Create CTA section

### Phase 3: 3D & Animation
- [ ] Implement 3D scene with Three.js
- [ ] Add particle field background
- [ ] Create floating 3D shapes
- [ ] Add scroll animations
- [ ] Implement hover effects
- [ ] Add parallax scrolling

### Phase 4: Polish
- [ ] Optimize performance
- [ ] Add loading states
- [ ] Implement responsive design
- [ ] Test accessibility
- [ ] Add micro-interactions
- [ ] Test on multiple devices

### Phase 5: Content
- [ ] Write compelling copy
- [ ] Create or source images
- [ ] Add icons
- [ ] Collect testimonials
- [ ] Final design review

## Advanced Features (Optional)

### Interactive Demo
- Embed a mini interactive demo of the TODO app
- Show real-time collaboration features
- Animated product walkthrough

### Video Background
- Hero section with subtle video loop
- Overlay with dark gradient for text readability

### Cursor Effects
- Custom cursor with trailing effect
- Interactive cursor that responds to elements

### Sound Effects
- Subtle audio feedback on interactions
- Toggle for users to enable/disable

### Dark/Light Mode Toggle
- Theme switcher in header
- Smooth transition between modes
- Respect system preferences

## Resources & Inspiration

### Design Inspiration
- https://halo.ai
- https://linear.app
- https://vercel.com
- https://stripe.com
- https://resend.com

### 3D Libraries
- Three.js: https://threejs.org/
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber
- Three.js Examples: https://threejs.org/examples/

### Animation Libraries
- Framer Motion: https://www.framer.com/motion/
- GSAP: https://greensock.com/gsap/
- Lottie: https://airbnb.design/lottie/

---

**Note**: This skill document should be used as a comprehensive guide for building the homepage. Adjust content, features, and complexity based on project requirements and timeline.