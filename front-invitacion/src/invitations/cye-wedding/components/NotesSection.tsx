import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../i18n/useTranslation';

const NotesSection: React.FC = () => {
  const { t } = useTranslation();
  const [currentGroup, setCurrentGroup] = useState(0);
  const [countdown, setCountdown] = useState(9);

  const notes = [
    {
      icon: '👗',
      title: t('notes', 'dressCodeTitle'),
      description: t('notes', 'dressCodeDescription'),
      showColors: true
    },
    {
      icon: '👶',
      title: t('notes', 'childrenTitle'),
      description: t('notes', 'childrenDescription')
    },
    {
      icon: '⏰',
      title: t('notes', 'punctualityTitle'),
      description: t('notes', 'punctualityDescription')
    },
    {
      icon: '🎉',
      title: t('notes', 'surprisesTitle'),
      description: t('notes', 'surprisesDescription')
    }
  ];

  // Custom grouping: Vestimenta (1), Niños (1), Puntualidad + Sorpresas (2)
  const firstGroup = [notes[0]];  // Vestimenta
  const secondGroup = [notes[1]]; // Niños Bienvenidos
  const thirdGroup = [notes[2], notes[3]]; // Puntualidad + Sorpresas
  const groups = [firstGroup, secondGroup, thirdGroup];

  useEffect(() => {
    // Countdown timer (updates every second)
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          return 9; // Reset to 9 when it reaches 0
        }
        return prev - 1;
      });
    }, 1000);

    // Group change timer (every 9 seconds)
    const groupInterval = setInterval(() => {
      setCurrentGroup(prev => (prev + 1) % groups.length);
      setCountdown(9); // Reset countdown when group changes
    }, 9000);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(groupInterval);
    };
  }, [groups.length]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="mobile-content-container mobile-safe-area md:contents">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/50 rounded-lg p-6 w-full max-w-md mx-4 shadow-lg"
        >
          {/* Title */}
          <div className="text-center mb-6">
            <h3 className="text-4xl md:text-3xl font-elegant font-bold text-sage-green mb-2">
              {t('notes', 'title')}
            </h3>
          </div>

          {/* Animated Notes Groups */}
          <div className="h-70 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGroup}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <div className="space-y-4">
                  {groups[currentGroup]?.map((note, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-white bg-opacity-20 rounded-lg p-2 flex items-start space-x-3"
                    >
                      <span className="text-2xl flex-shrink-0 mt-1" role="img" aria-label="note-icon">
                        {note.icon}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-xl font-medium text-burgundy mb-1">
                          {note.title}
                        </h4>
                        <p className="text-burgundy opacity-90 text-lg leading-relaxed">
                          {note.description}
                        </p>
                        {note.showColors && (
                          <div className="mt-3">
                            <p className="text-burgundy text-lg font-medium mb-2">
                              {t('notes', 'forbiddenColors')}
                            </p>
                            <div className="flex gap-4">
                              <div className="flex flex-col items-center gap-1">
                                <div
                                  className="w-8 h-8 rounded-full border-2 border-gray-300 bg-white shadow-sm"
                                  title={t('notes', 'white')}
                                />
                                <span className="text-burgundy text-xs">{t('notes', 'white')}</span>
                              </div>
                              <div className="flex flex-col items-center gap-1">
                                <div
                                  className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-sm"
                                  style={{ backgroundColor: '#CFB997' }}
                                  title={t('notes', 'beige')}
                                />
                                <span className="text-burgundy text-xs">{t('notes', 'beige')}</span>
                              </div>
                              <div className="flex flex-col items-center gap-1">
                                <div
                                  className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-sm"
                                  style={{ backgroundColor: '#A9BA9D' }}
                                  title={t('notes', 'green')}
                                />
                                <span className="text-burgundy text-xs">{t('notes', 'green')}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                    {/* Countdown Timer */}
                    <div className="text-center mb-4">
                      <motion.div
                        key={countdown}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sage-green/20 text-sage-green font-semibold text-lg"
                      >
                        {countdown}
                      </motion.div>
                    </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {groups.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentGroup ? 'bg-sage-green' : 'bg-sage-green opacity-30'
                }`}
              />
            ))}
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default NotesSection;