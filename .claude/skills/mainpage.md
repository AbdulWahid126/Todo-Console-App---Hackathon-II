# Main Page UI Skill

## Task
Build a modern, visually appealing home page for a TODO application using Next.js with dark theme design.

## Design Requirements

### Visual Style
- **Theme**: Dark navy/black background with blue gradient accents
- **Colors**: 
  - Background: `#0a0e1a` to `#1a1f2e`
  - Accent: Blue gradients `#3b82f6` to `#60a5fa`
  - Text: White/light gray primary, muted gray secondary
- **Effects**: Glassmorphism, smooth transitions, gradient text for emphasis
- **Layout**: Generous whitespace, card-based components, centered hero section

### Key Sections
1. **Hero Section**
   - Large, bold heading with gradient text effect
   - Compelling tagline/description
   - Primary CTA button to navigate to TODO list
   - Visually striking with modern typography

2. **Features Highlight** (Optional)
   - 2-3 feature cards showcasing app capabilities
   - Icons or visual elements
   - Brief descriptions

3. **Navigation**
   - Clean navigation to TODO list page
   - Smooth hover effects

## Technical Notes

### Next.js Version Compatibility
- Works with Next.js 14 and 15+
- Use App Router structure (`app/page.tsx`)
- Server Components by default unless interactivity needed

### CSS Approach
- Use `app/globals.css` for styling
- Define CSS custom properties for theming
- Use modern CSS (flexbox, grid, gradients)
- Ensure responsive design

### Component Structure
```
app/
├── page.tsx        # Home page component
└── globals.css     # Global styles with design system
```

## Implementation Focus
- **Priority**: Clean, working CSS that renders properly
- **Typography**: Large, bold headings with gradient effects
- **Spacing**: Generous padding and margins
- **Interactivity**: Smooth hover states on buttons/links
- **Responsive**: Mobile-friendly layout

## Example CSS Variables Pattern
```css
--bg-primary: #0a0e1a;
--accent-primary: #3b82f6;
--text-primary: #ffffff;
--spacing-lg: 2rem;
```

## Page Structure

### Layout Flow
1. **Header/Navigation** (top, fixed or sticky)
   - Logo/App name on left
   - Navigation links on right (Get Started, Features)

2. **Hero Section** (full viewport height)
   - Centered content
   - Main heading with gradient text: "Organize Your Life, One Task at a Time"
   - Subtitle: "A complete todo solution that helps you..."
   - Large CTA button (arrow icon) linking to /todos
   - Background: Subtle gradient or pattern

3. **Features Section** (3-column grid)
   - **Feature 1**: Powerful Features
     - Clipboard icon (large, white)
     - Title + description
   - **Feature 2**: Track Management  
     - Checkmark circle icon (large, white)
     - Title + description
   - **Feature 3**: Complete Tracking
     - Sun/circle icon (large, white)
     - Title + description

4. **Footer** (bottom)
   - Copyright or additional links
   - Social links

### Spacing & Sizing
- Hero section: `min-height: 100vh`, centered flex
- Features section: `padding: 4rem 2rem`, max-width container
- Icons: 120px-150px size
- Headings: 3rem-4rem for hero, 1.5rem for features
- Generous gaps: 3rem-4rem between sections

### CSS Improvements Needed
- Center all content properly using flexbox/grid
- Add max-width container (1200px) for content
- Proper vertical spacing between sections
- Icon sizing and positioning
- Button hover effects with smooth transitions
- Responsive breakpoints for mobile

### Current Issues to Fix
- Content not centered horizontally
- Inconsistent spacing between sections
- Icons need proper sizing and alignment
- Text needs better hierarchy
- Arrow button needs better styling
- Missing hover states

## Expected Outcome
A fully functional, visually appealing landing page that matches the modern dark theme aesthetic with properly centered content, clear visual hierarchy, and smooth interactions.