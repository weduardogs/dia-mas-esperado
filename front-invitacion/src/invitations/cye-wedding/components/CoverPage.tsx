import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeddingData, FamilyData } from '../../../types';

interface CoverPageProps {
  weddingData: WeddingData;
  familyData: FamilyData;
  onNext: () => void;
}

const CoverPage: React.FC<CoverPageProps> = ({ weddingData, familyData, onNext }) => {
  const [showNavigationHint, setShowNavigationHint] = useState(true);

  useEffect(() => {
    // Hide animation after 4 seconds
    const timer = setTimeout(() => {
      setShowNavigationHint(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center text-center p-4">
      <div className="mobile-content-container mobile-safe-area md:contents">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-white/50 rounded-lg p-8 w-full max-w-md mx-4 shadow-lg"
        >
          {/* Couple Names */}
          <div className="mb-6">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-6xl sm:text-7xl md:text-8xl font-great-vibes text-sage-green mb-2"
            >
              {weddingData.brideName}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-4xl md:text-5xl font-great-vibes text-sage-green mb-2"
            >
              &
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="text-6xl sm:text-7xl md:text-8xl font-great-vibes text-sage-green"
            >
              {weddingData.groomName}
            </motion.h1>
          </div>

          {/* Wedding Announcement */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-3xl md:text-4xl font-raleway font-semibold text-burgundy mb-6"
          >
            ¡Nos casamos!
          </motion.h2>

          {/* Personal Message */}
          {familyData.personalMessage && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-burgundy font-raleway text-lg leading-relaxed mb-6"
            >
              {familyData.personalMessage}
            </motion.p>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.6 }}
          className="mt-8"
        >
          <button
            onClick={onNext}
            className="bg-sage-green hover:bg-opacity-80 text-light-text font-raleway font-semibold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 text-xl"
          >
            Ver Detalles de la Boda
          </button>
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

export default CoverPage;