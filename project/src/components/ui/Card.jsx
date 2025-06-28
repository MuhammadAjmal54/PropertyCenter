// components/ui/Card.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  onClick,
  hoverable = false
}) => {
  return (
    <motion.div 
      className={`bg-white rounded-xl shadow-md overflow-hidden ${hoverable ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''} ${className}`}
      whileHover={hoverable ? { scale: 1.02 } : {}}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;
