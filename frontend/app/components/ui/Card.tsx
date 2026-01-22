import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  variant?: 'default' | 'glass';
}

const Card = ({ children, className = '', hoverEffect = true, variant = 'glass' }: CardProps) => {
  const baseClasses = "rounded-2xl p-6";

  const variantClasses = variant === 'glass'
    ? "glass-card backdrop-blur-lg border border-[rgba(255,255,255,0.1)]"
    : "bg-gray-800 border border-gray-700";

  const classes = `${baseClasses} ${variantClasses} ${className}`;

  if (hoverEffect) {
    return (
      <motion.div
        className={classes}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={classes}>{children}</div>;
};

export default Card;