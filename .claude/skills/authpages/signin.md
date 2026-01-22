# Sign In Page Skill

## Overview
Create a modern, secure sign-in page with a clean design that matches the dark theme aesthetic of the TODO application.

## Page Location
```
app/auth/signin/page.tsx
```

## Design Requirements

### Visual Style
- **Theme**: Dark background (`#0a0e1a` to `#1a1f2e`)
- **Layout**: Centered card with glassmorphism effect
- **Form**: Clean, minimal input fields with focus states
- **CTAs**: Prominent sign-in button with gradient hover effect

### Layout Structure
1. **Centered Container**
   - Max-width: 450px
   - Centered vertically and horizontally
   - Glass card effect with backdrop blur

2. **Content Sections**
   - Logo/App name at top
   - "Welcome Back" heading
   - Sign-in form
   - Social login options (optional)
   - Sign-up link at bottom

## Component Structure

### Form Fields
```typescript
interface SignInForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}
```

**Required Fields**:
- Email input (type: email, validation required)
- Password input (type: password, show/hide toggle)
- Remember me checkbox (optional)
- Forgot password link
- Submit button

### Form Validation
- Email: Valid email format
- Password: Minimum 8 characters
- Show inline error messages
- Disable submit until valid

### Visual Elements
- **Card Background**: `rgba(255, 255, 255, 0.05)` with backdrop blur
- **Border**: `1px solid rgba(255, 255, 255, 0.1)`
- **Border Radius**: `1rem`
- **Padding**: `3rem`
- **Input Fields**: Dark background with light border, focus: blue accent
- **Button**: Gradient background (`#3b82f6` to `#60a5fa`), full width
- **Links**: Blue accent color with hover underline

## User Flow

### States
1. **Default**: Empty form ready for input
2. **Loading**: Submitting form, show spinner on button
3. **Error**: Display error message above form
4. **Success**: Redirect to dashboard

### Error Handling
- Invalid credentials: "Invalid email or password"
- Network error: "Connection failed. Please try again"
- Server error: "Something went wrong. Please try again later"

## Additional Features

### Social Login (Optional)
- Google sign-in button
- GitHub sign-in button
- Divider text: "Or continue with email"

### Security Features
- Password visibility toggle icon
- Remember me functionality
- Forgot password link → `/auth/forgot-password`

### Links & Navigation
- Sign up link: "Don't have an account? Sign up"
- Back to home: Logo or back button
- Forgot password: "Forgot your password?"

## Styling Details

### Input Fields
```css
- Background: rgba(255, 255, 255, 0.05)
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border-radius: 0.5rem
- Padding: 0.75rem 1rem
- Font-size: 1rem
- Color: white
- Focus: Border-color: #3b82f6, outline: none
- Placeholder: rgba(255, 255, 255, 0.4)
```

### Button
```css
- Background: linear-gradient(135deg, #3b82f6, #60a5fa)
- Width: 100%
- Padding: 0.875rem
- Border-radius: 0.5rem
- Font-weight: 600
- Hover: Transform: translateY(-2px), box-shadow enhance
- Disabled: Opacity 0.5, cursor not-allowed
```

### Error Message
```css
- Background: rgba(239, 68, 68, 0.1)
- Border: 1px solid rgba(239, 68, 68, 0.3)
- Color: #ef4444
- Padding: 0.75rem
- Border-radius: 0.5rem
- Margin-bottom: 1rem
```

## API Integration

### Endpoint
```typescript
POST /api/auth/signin

Request Body:
{
  email: string;
  password: string;
  rememberMe?: boolean;
}

Response (Success):
{
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  }
}

Response (Error):
{
  error: string;
  message: string;
}
```

### Implementation
```typescript
// lib/api.ts
export async function signIn(data: SignInForm): Promise<AuthResponse>
```

## Accessibility
- Label all form inputs
- ARIA labels for password toggle
- Keyboard navigation support
- Focus visible states
- Screen reader friendly error messages

## Responsive Design
- Mobile: Full width card with padding
- Desktop: Fixed width (450px) centered card
- Maintain consistent spacing

## Success Redirect
After successful sign-in:
- Store auth token (use Next.js session/cookies, NOT localStorage)
- Redirect to `/dashboard` or `/todos`
- Show welcome notification (optional)

## Notes
- Use TypeScript for type safety
- Implement proper error boundaries
- Use Next.js App Router conventions
- Follow existing project patterns from frontend/lib/api.ts
- Match styling with globals.css design system