import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../i18n/useTranslation';

const GiftRegistrySection: React.FC = () => {
  const { t } = useTranslation();
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

  // Liverpool gift registry link
  const giftRegistryUrl = 'https://mesaderegalos.liverpool.com.mx/milistaderegalos/51815735';

  return (
    <section className="w-full flex flex-col items-center py-8 px-4 mobile-safe-area">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="glass-card rounded-3xl p-8 w-full max-w-md"
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
              className="text-4xl md:text-3xl font-elegant font-bold text-sage-green mb-6 text-enhanced-shadow tracking-wide"
            >
              {t('gifts', 'title')}
            </motion.h3>

            {/* Gift Icon */}
            <motion.div
              variants={itemVariants}
              className="text-7xl mb-8 animate-float"
            >
              🎁
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-burgundy text-lg leading-relaxed mb-8 px-2"
            >
              {t('gifts', 'description')}
            </motion.p>

            {/* Gift Registry Button - Will be enabled when URL is added */}
            <motion.div
              variants={itemVariants}
              className="mt-8"
            >
              <motion.a
                href={giftRegistryUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-sage-green hover:bg-opacity-90 text-white font-semibold px-8 py-4 rounded-xl btn-elegant tracking-wide"
              >
                {t('gifts', 'button')}
              </motion.a>
            </motion.div>

            {/* Decorative Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-center mt-10"
            >
              <div className="text-5xl text-gold-light opacity-90 animate-pulse-soft">
                💝
              </div>
            </motion.div>
          </motion.div>
      </motion.div>
    </section>
  );
};

export default GiftRegistrySection;
