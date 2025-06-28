// components/ui/Button.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyle =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-blue-900 text-white hover:bg-blue-800 focus:ring-blue-700',
    secondary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-400',
    outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-300',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
  };

  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
