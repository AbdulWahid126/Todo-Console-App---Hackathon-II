import { motion } from 'framer-motion';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  disabled = false
}: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90",
    secondary: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900",
    ghost: "text-white hover:bg-white/10"
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`;

  const content = (
    <motion.button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
    >
      {children}
    </motion.button>
  );

  if (href) {
    return (
      <Link href={href}>
        {content}
      </Link>
    );
  }

  return content;
};

export default Button;