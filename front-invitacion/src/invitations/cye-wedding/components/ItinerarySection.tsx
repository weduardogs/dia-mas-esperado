import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EventItinerary } from '../../../types';
import { useTranslation } from '../i18n/useTranslation';

interface ItinerarySectionProps {
  itinerary: EventItinerary[];
}

const ItinerarySection: React.FC<ItinerarySectionProps> = ({
  itinerary
}) => {
  const { t } = useTranslation();
  const [currentGroup, setCurrentGroup] = useState(0);
  const [countdown, setCountdown] = useState(9);

  // Translate event names
  const translatedItinerary = itinerary.map(item => ({
    ...item,
    event: getTranslatedEvent(item.id),
    description: getTranslatedDescription(item.id)
  }));

  function getTranslatedEvent(id: string): string {
    switch(id) {
      case '1': return t('itinerary', 'ceremony');
      case '2': return t('itinerary', 'cocktail');
      case '3': return t('itinerary', 'dinner');
      case '4': return t('itinerary', 'dance');
      default: return '';
    }
  }

  function getTranslatedDescription(id: string): string {
    switch(id) {
      case '1': return t('itinerary', 'ceremonyLocation');
      case '2': return t('itinerary', 'cocktailLocation');
      case '3': return t('itinerary', 'dinnerLocation');
      case '4': return t('itinerary', 'danceDescription');
      default: return '';
    }
  }

  // Split itinerary into groups of 2
  const groups: EventItinerary[][] = [];
  for (let i = 0; i < translatedItinerary.length; i += 2) {
    groups.push(translatedItinerary.slice(i, i + 2));
  }

  useEffect(() => {
    if (groups.length <= 1) return;

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

  const getEventIcon = (event: string) => {
    if (event.toLowerCase().includes('ceremonia')) return '⛪';
    if (event.toLowerCase().includes('cocktail')) return '🥂';
    if (event.toLowerCase().includes('cena')) return '🍽️';
    if (event.toLowerCase().includes('baile')) return '💃';
    return '❤️';
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
            {t('itinerary', 'title')}
          </h3>
        </div>

          {/* Animated Groups */}
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
                  {groups[currentGroup]?.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      className="flex items-center justify-between py-5 px-5 bg-white bg-opacity-25 rounded-2xl backdrop-blur-sm shadow-sm hover:shadow-md smooth-transition"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl animate-float" role="img" aria-label="event-icon">
                          {getEventIcon(item.event)}
                        </span>
                        <div>
                          <h4 className="text-xl font-semibold text-burgundy leading-tight tracking-wide">
                            {item.event}
                          </h4>
                          {item.description && (
                            <p className="text-base text-burgundy opacity-90 leading-tight mt-0.5">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-burgundy font-bold text-lg text-right ml-3 tracking-wide">
                        {item.time}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Countdown Timer */}
          {groups.length > 1 && (
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
          )}

          {/* Progress indicators */}
          {groups.length > 1 && (
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
          )}
      </motion.div>
    </section>
  );
};

export default ItinerarySection;