import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
  celebrantName: string;
  message: string;
  previousSection?: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ celebrantName, message, previousSection }) => {
  const [showNavigationHint, setShowNavigationHint] = useState(true);

  useEffect(() => {
    // Hide animation if coming from section 2 (index 1) or last section (index 7)
    const isFromSection2 = previousSection === 1;
    const isFromLastSection = previousSection === 7;
    
    if (isFromSection2 || isFromLastSection) {
      setShowNavigationHint(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowNavigationHint(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [previousSection]);
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 safe-area-inset relative small-height-section">
      {/* Discreet cowboy decorative elements */}
      <motion.div
        className="absolute top-20 right-8 text-4xl opacity-20 small-height-reduce-decoration"
        initial={{ opacity: 0, rotate: -15 }}
        animate={{ opacity: 0.2, rotate: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        🤠
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 left-8 text-3xl opacity-15 small-height-reduce-decoration"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.15, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        👢
      </motion.div>

      <div className="text-right max-w-sm ml-auto w-full pr-4 small-height-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 small-height-compact"
        >
          <motion.div
            className="flex justify-end items-center space-x-2 mb-4 small-height-hide-decoration"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.span
              className="text-2xl small-height-emoji"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 2 }}
            >
              ⭐
            </motion.span>
            <motion.span
              className="text-xl opacity-80 small-height-emoji"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 3 }}
            >
              🌾
            </motion.span>
          </motion.div>

          <motion.h1 
            className="text-5xl sm:text-6xl md:text-8xl font-bold text-purple-800 mb-2 drop-shadow-lg pr-4 small-height-title"
            style={{ fontFamily: 'Great Vibes, cursive' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Mis Quince
          </motion.h1>
          
          <motion.h2 
            className="text-4xl sm:text-6xl md:text-5xl text-purple-700 font-light mb-6 drop-shadow-md pr-4 small-height-subtitle"
            style={{ fontFamily: 'Great Vibes, cursive' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {celebrantName}
          </motion.h2>

          <motion.div
            className="px-4 py-4 relative small-height-spacing"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <p className="text-purple-700 text-3xl sm:text-5xl leading-relaxed italic drop-shadow-md text-right pl-10 small-height-large-text" style={{ fontFamily: 'Great Vibes, cursive' }}>
              "{message}"
            </p>
            
            {/* Subtle horseshoe decoration */}
            <motion.div
              className="absolute -bottom-4 right-0 text-xl opacity-30 small-height-hide-decoration"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              🐎
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation Indicator Animation */}
      <AnimatePresence>
        {showNavigationHint && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Slightly opaque background */}
            <div className="absolute inset-0 bg-black bg-opacity-70" />
            
            {/* First animation cycle */}
            <motion.img
              src="/manita.png"
              alt="Navigation indicator"
              className="absolute w-40 h-40 object-contain"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
              }}
              initial={{ bottom: -48, opacity: 0 }}
              animate={{
                bottom: ['0%', '90%'],
                opacity: [0, 0.8, 0.8, 0]
              }}
              transition={{
                duration: 2,
                times: [0, 0.2, 0.8, 1],
                ease: "easeInOut"
              }}
            />
            
            {/* Second animation cycle (delayed) */}
            <motion.img
              src="/manita.png"
              alt="Navigation indicator"
              className="absolute w-40 h-40 object-contain"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
              }}
              initial={{ bottom: -48, opacity: 0 }}
              animate={{
                bottom: ['0%', '90%'],
                opacity: [0, 0.8, 0.8, 0]
              }}
              transition={{
                duration: 2,
                delay: 2.5,
                times: [0, 0.2, 0.8, 1],
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;