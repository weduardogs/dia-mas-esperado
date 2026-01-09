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
    <section className="w-full flex flex-col items-center py-8 px-4 mobile-safe-area">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="glass-card rounded-3xl p-8 w-full max-w-md"
      >
        {/* Title */}
        <div className="text-center mb-8">
          <h3 className="text-4xl md:text-3xl font-elegant font-bold text-sage-green mb-2 text-enhanced-shadow tracking-wide">
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
                      className="bg-white bg-opacity-25 rounded-2xl p-4 flex items-start space-x-4 backdrop-blur-sm shadow-sm hover:shadow-md smooth-transition"
                    >
                      <span className="text-3xl flex-shrink-0 mt-1 animate-float" role="img" aria-label="note-icon">
                        {note.icon}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-burgundy mb-2 tracking-wide">
                          {note.title}
                        </h4>
                        <p className="text-burgundy opacity-90 text-base leading-relaxed">
                          {note.description}
                        </p>
                        {note.showColors && (
                          <div className="mt-4">
                            <p className="text-burgundy text-base font-semibold mb-3 tracking-wide">
                              {t('notes', 'forbiddenColors')}
                            </p>
                            <div className="flex gap-5 justify-center">
                              <div className="flex flex-col items-center gap-2">
                                <div
                                  className="w-10 h-10 rounded-full border-2 border-gray-300 bg-white shadow-md smooth-transition hover:scale-110"
                                  title={t('notes', 'white')}
                                />
                                <span className="text-burgundy text-xs font-medium">{t('notes', 'white')}</span>
                              </div>
                              <div className="flex flex-col items-center gap-2">
                                <div
                                  className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-md smooth-transition hover:scale-110"
                                  style={{ backgroundColor: '#CFB997' }}
                                  title={t('notes', 'beige')}
                                />
                                <span className="text-burgundy text-xs font-medium">{t('notes', 'beige')}</span>
                              </div>
                              <div className="flex flex-col items-center gap-2">
                                <div
                                  className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-md smooth-transition hover:scale-110"
                                  style={{ backgroundColor: '#A9BA9D' }}
                                  title={t('notes', 'green')}
                                />
                                <span className="text-burgundy text-xs font-medium">{t('notes', 'green')}</span>
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
                        initial={{ scale: 1.3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-green/25 text-sage-green font-bold text-xl shadow-sm"
                      >
                        {countdown}
                      </motion.div>
                    </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center space-x-3 mt-6">
            {groups.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className={`w-2.5 h-2.5 rounded-full smooth-transition shadow-sm ${
                  index === currentGroup ? 'bg-sage-green scale-125' : 'bg-sage-green/40'
                }`}
              />
            ))}
          </div>
      </motion.div>
    </section>
  );
};

export default NotesSection;