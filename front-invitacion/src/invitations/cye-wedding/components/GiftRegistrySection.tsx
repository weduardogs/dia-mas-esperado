import React from 'react';
import { motion } from 'framer-motion';

const GiftRegistrySection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Placeholder for gift registry link
  const giftRegistryUrl = ''; // Link will be added later

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="mobile-content-container mobile-safe-area md:contents">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/50 rounded-lg p-8 w-full max-w-md mx-4 shadow-lg"
        >
          {/* Title */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.h3
              variants={itemVariants}
              className="text-4xl md:text-3xl font-elegant font-bold text-sage-green mb-4"
            >
              Mesa de Regalos
            </motion.h3>

            {/* Gift Icon */}
            <motion.div
              variants={itemVariants}
              className="text-6xl mb-6"
            >
              🎁
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-burgundy text-base leading-relaxed mb-6"
            >
              Tu presencia es nuestro mejor regalo, pero si deseas obsequiarnos algo,
              hemos preparado una mesa de regalos para ti.
            </motion.p>

            {/* Gift Registry Button - Will be enabled when URL is added */}
            <motion.div
              variants={itemVariants}
              className="mt-6"
            >
              {giftRegistryUrl ? (
                <a
                  href={giftRegistryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-sage-green hover:bg-opacity-90 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Ver Mesa de Regalos
                </a>
              ) : (
                <div className="text-burgundy text-sm italic opacity-75">
                  Link próximamente
                </div>
              )}
            </motion.div>

            {/* Decorative Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-center mt-8"
            >
              <div className="text-4xl text-gold-light opacity-90">
                💝
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default GiftRegistrySection;
