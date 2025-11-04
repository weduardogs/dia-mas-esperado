import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EventItinerary } from '../../../types';

interface ItinerarySectionProps {
  itinerary: EventItinerary[];
}

const ItinerarySection: React.FC<ItinerarySectionProps> = ({
  itinerary
}) => {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [countdown, setCountdown] = useState(9);

  // Split itinerary into groups of 2
  const groups: EventItinerary[][] = [];
  for (let i = 0; i < itinerary.length; i += 2) {
    groups.push(itinerary.slice(i, i + 2));
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
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="mobile-content-container mobile-safe-area md:contents">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/50 rounded-lg p-7 w-full max-w-md mx-4 shadow-lg"
        >
          {/* Title */}
          <div className="text-center mb-6">
            <h3 className="text-4xl md:text-3xl font-elegant font-bold text-sage-green mb-2">
              Programa del día
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
                      className="flex items-center justify-between py-4 px-4 bg-white bg-opacity-20 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl" role="img" aria-label="event-icon">
                          {getEventIcon(item.event)}
                        </span>
                        <div>
                          <h4 className="text-xl font-medium text-burgundy leading-tight">
                            {item.event}
                          </h4>
                          {item.description && (
                            <p className="text-lg text-burgundy opacity-90 leading-tight">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-burgundy font-semibold text-lg text-right ml-2">
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
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sage-green/20 text-sage-green font-semibold text-lg"
              >
                {countdown}
              </motion.div>
            </div>
          )}

          {/* Progress indicators */}
          {groups.length > 1 && (
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
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ItinerarySection;