import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrollIndicatorProps {
  isVisible: boolean;
  onClick?: () => void;
  position?: 'bottom-center' | 'bottom-right';
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ 
  isVisible, 
  onClick,
  position = 'bottom-center'
}) => {
  const [showIndicator, setShowIndicator] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      setShowIndicator(true);
      const timer = setTimeout(() => {
        setShowIndicator(false);
      }, 2000); // Show for 2 seconds then fade out
      
      return () => clearTimeout(timer);
    } else {
      setShowIndicator(false);
    }
  }, [isVisible]);

  const positionClasses = {
    'bottom-center': 'bottom-8 left-1/2 transform -translate-x-1/2',
    'bottom-right': 'bottom-8 right-8'
  };

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed ${positionClasses[position]} z-30`}
        >
          <motion.button
            onClick={onClick}
            className="bg-gold bg-opacity-20 hover:bg-opacity-40 backdrop-blur-sm rounded-full p-4 transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <motion.svg
              className="w-6 h-6 text-gold group-hover:text-gold-light transition-colors duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </motion.svg>
          </motion.button>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollIndicator;