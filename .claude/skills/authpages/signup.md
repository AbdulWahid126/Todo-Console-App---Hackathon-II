# Sign Up Page Skill

## Overview
Create a modern registration page with comprehensive form validation and a welcoming design that encourages new users to create an account.

## Page Location
```
app/auth/signup/page.tsx
```

## Design Requirements

### Visual Style
- **Theme**: Dark background matching sign-in page
- **Layout**: Centered card (max-width: 500px)
- **Form**: Multi-field registration with real-time validation
- **Progress**: Optional visual feedback for password strength

### Layout Structure
1. **Centered Container**
   - Max-width: 500px
   - Glass card effect
   - Slightly larger than sign-in to accommodate more fields

2. **Content Sections**
   - Logo/App name
   - "Create Account" heading
   - Registration form
   - Terms acceptance checkbox
   - Social sign-up options (optional)
   - Sign-in link at bottom

## Component Structure

### Form Fields
```typescript
interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}
```

**Required Fields**:
- Full name input
- Email input (with availability check)
- Password input (with strength indicator)
- Confirm password input
- Terms & conditions checkbox
- Submit button

### Form Validation

**Name**:
- Required, minimum 2 characters
- No special characters

**Email**:
- Valid email format
- Check availability (debounced API call)
- Show "✓ Available" or "✗ Already taken"

**Password**:
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 number
- At least 1 special character
- Show strength indicator (Weak/Medium/Strong)

**Confirm Password**:
- Must match password field
- Real-time validation

**Terms**:
- Must be checked to submit

### Password Strength Indicator
```typescript
interface PasswordStrength {
  score: number; // 0-4
  label: 'Weak' | 'Fair' | 'Good' | 'Strong';
  color: string; // red, yellow, cyan, green
}
```

Visual display:
- Progress bar under password field
- Color-coded: Red → Yellow → Green
- Text label showing strength

## Visual Design

### Card Styling
```css
- Background: rgba(255, 255, 255, 0.05)
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border-radius: 1rem
- Padding: 3rem
- Backdrop-filter: blur(10px)
- Box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3)
```

### Input Fields
Same styling as sign-in page, with additions:
- Success state: Green border for valid fields
- Error state: Red border for invalid fields
- Helper text below each field for guidance

### Button
```css
- Same gradient style as sign-in
- Text: "Create Account" or "Sign Up"
- Loading state: Spinner + "Creating account..."
```

### Validation Messages
```css
- Error: Red color, small text below input
- Success: Green color with checkmark icon
- Info: Gray color for helper text
```

## User Flow

### States
1. **Default**: Empty form with helper text
2. **Typing**: Real-time validation feedback
3. **Validating**: Check email availability
4. **Valid**: All fields valid, button enabled
5. **Submitting**: Loading state, button disabled
6. **Error**: Show error message, re-enable form
7. **Success**: Redirect to dashboard or email verification

### Error Handling
- **Email taken**: "This email is already registered. Try signing in?"
- **Network error**: "Connection failed. Please try again"
- **Validation error**: Show inline errors per field
- **Server error**: "Unable to create account. Please try again"

## Additional Features

### Social Sign-Up (Optional)
- Google sign-up button
- GitHub sign-up button
- Divider: "Or sign up with email"

### Email Verification
After successful registration:
- Send verification email
- Show "Check your email" message
- Option to resend verification email
- Redirect to verification pending page

### Terms & Privacy
- Checkbox with text: "I agree to the Terms of Service and Privacy Policy"
- Links should open in new tab
- Required before submission

### Links & Navigation
- Sign-in link: "Already have an account? Sign in"
- Back to home: Logo click or back button

## API Integration

### Endpoints

**Check Email Availability**:
```typescript
GET /api/auth/check-email?email={email}

Response:
{
  available: boolean;
  message?: string;
}
```

**Create Account**:
```typescript
POST /api/auth/signup

Request Body:
{
  name: string;
  email: string;
  password: string;
}

Response (Success):
{
  user: {
    id: string;
    name: string;
    email: string;
  };
  token?: string; // If auto sign-in
  verificationRequired: boolean;
}

Response (Error):
{
  error: string;
  message: string;
  field?: string; // Which field caused error
}
```

### Implementation
```typescript
// lib/api.ts
export async function checkEmailAvailability(email: string): Promise<boolean>
export async function signUp(data: SignUpForm): Promise<AuthResponse>
```

## Password Strength Logic

### Calculation
```typescript
function calculatePasswordStrength(password: string): PasswordStrength {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  
  const labels = ['Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['#ef4444', '#ef4444', '#f59e0b', '#06b6d4', '#10b981'];
  
  return {
    score: Math.min(score, 4),
    label: labels[score],
    color: colors[score]
  };
}
```

## Accessibility
- All inputs properly labeled
- ARIA live region for validation messages
- Keyboard navigation through form
- Focus visible states
- Screen reader friendly error announcements
- Password visibility toggle with ARIA label

## Responsive Design
- Mobile: Full width with side padding
- Tablet: Centered card, max-width 500px
- Desktop: Same centered layout
- Stack social buttons on mobile

## Success Flow

### Option 1: Email Verification Required
1. Show success message
2. "Check your email for verification link"
3. Button: "Resend Email"
4. Auto redirect to `/auth/verify-email` page

### Option 2: Auto Sign-In
1. Store auth token (use Next.js session/cookies)
2. Show success toast notification
3. Redirect to `/dashboard` or onboarding

## Security Considerations
- Use HTTPS only
- Implement rate limiting on backend
- Hash passwords (backend responsibility)
- Validate on both client and server
- CSRF protection
- Prevent email enumeration attacks

## Progressive Enhancement
- Show password requirements before typing
- Green checkmarks appear as requirements are met
- Disable submit until all validations pass
- Provide clear, helpful error messages

## Notes
- Use TypeScript for all type definitions
- Implement debouncing for email check (300ms)
- Match design system from globals.css
- Follow Next.js App Router patterns
- Consider adding reCAPTCHA for spam prevention
- Store minimal user data initially