import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../i18n/useTranslation';
import { Language } from '../i18n/types';

const LanguageSelector: React.FC = () => {
  const { language, changeLanguage } = useTranslation();

  const handleLanguageChange = (lang: Language) => {
    changeLanguage(lang);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center gap-2 mb-6"
    >
      {/* Globe Icon */}
      <span className="text-2xl">🌐</span>

      {/* Language Buttons */}
      <div className="flex items-center gap-1 bg-black bg-opacity-20 rounded-full p-1">
        {/* Spanish Button */}
        <button
          onClick={() => handleLanguageChange('es')}
          className={`
            px-4 py-2 rounded-full font-raleway font-semibold text-sm
            transition-all duration-300 min-w-[44px] min-h-[44px]
            flex items-center justify-center
            ${
              language === 'es'
                ? 'bg-sage-green text-white shadow-md'
                : 'text-burgundy hover:text-burgundy/80'
            }
          `}
          aria-label="Cambiar a Español"
        >
          ES
        </button>

        {/* Separator */}
        <span className="text-white opacity-50">|</span>

        {/* English Button */}
        <button
          onClick={() => handleLanguageChange('en')}
          className={`
            px-4 py-2 rounded-full font-raleway font-semibold text-sm
            transition-all duration-300 min-w-[44px] min-h-[44px]
            flex items-center justify-center
            ${
              language === 'en'
                ? 'bg-sage-green text-white shadow-md'
                : 'text-burgundy hover:text-burgundy/80'
            }
          `}
          aria-label="Switch to English"
        >
          EN
        </button>
      </div>
    </motion.div>
  );
};

export default LanguageSelector;
