/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // Safelist gradient classes used dynamically
    {
      pattern: /(bg|from|to)-(blue|cyan|purple|pink|green|emerald|orange|red|indigo|teal)-(100|200|300|400|500|600|700|800|900)/,
    },
    // Safelist glassmorphism and other custom classes
    'glass-card',
    'backdrop-blur-lg',
    'backdrop-blur-md',
    'border',
    'border-[rgba\\(255\\,255\\,255\\,0\\.1\\)]',
    'bg-[rgba\\(255\\,255\\,255\\,0\\.05\\)]',
    'bg-gradient-to-r',
    'bg-gradient-to-b',
    'bg-gradient-to-l',
    'bg-gradient-to-t',
    // Common utility classes
    'rounded-2xl', 'rounded-xl', 'rounded-lg', 'rounded-full',
    'p-8', 'p-6', 'p-4', 'p-2',
    'm-', 'mx-', 'my-', 'mt-', 'mb-', 'ml-', 'mr-',
    'text-center', 'text-left', 'text-right',
    'text-white', 'text-gray-', 'text-blue-', 'text-cyan-',
    'font-bold', 'font-semibold', 'font-medium',
    'flex', 'inline-flex', 'block', 'hidden',
    'items-center', 'justify-center', 'justify-between',
    'w-', 'h-', 'min-h-', 'min-w-',
    'max-w-', 'max-h-',
    'grid', 'grid-cols-', 'gap-',
    'bg-', 'bg-\\[', // for custom background colors
    'text-', 'text-\\d+', // for text sizes
    'leading-', 'z-', 'absolute', 'relative', 'sticky', 'fixed',
    'overflow-', 'shadow-', 'border-', 'rounded-',
    'hover:', 'focus:', 'active:',
    'transition-', 'duration-', 'ease-',
    'transform', 'scale-', 'translate-', 'rotate-',
    'animate-', 'delay-', 'duration-',
  ],
}

