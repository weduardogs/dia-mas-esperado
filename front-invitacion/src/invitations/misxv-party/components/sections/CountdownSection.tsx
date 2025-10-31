import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CountdownSectionProps {
  eventDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownSection: React.FC<CountdownSectionProps> = ({ eventDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Fixed date: November 8th 2025, 2:30 PM
      const eventDateTime = new Date('2025-11-08T14:30:00').getTime();
      const difference = eventDateTime - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    calculateTimeLeft();
    return () => clearInterval(timer);
  }, [eventDate]);

  const timeUnits = [
    { label: 'Días', value: timeLeft.days, emoji: '📅' },
    { label: 'Horas', value: timeLeft.hours, emoji: '🕐' },
    { label: 'Minutos', value: timeLeft.minutes, emoji: '⏰' },
    { label: 'Segundos', value: timeLeft.seconds, emoji: '⚡' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative small-height-section">
      {/* Discreet cowboy decorative elements */}
      <motion.div
        className="absolute top-24 right-12 text-xl opacity-15 small-height-reduce-decoration"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
      >
        🤠
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-10 text-lg opacity-20 small-height-reduce-decoration"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.2, y: 0 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        ⭐
      </motion.div>

      <div className="max-w-lg ml-auto text-right pl-8 pr-5 space-y-8 small-height-container small-height-compact">
        <motion.h2 
          className="text-4xl font-bold text-purple-700 mb-6 drop-shadow-lg relative small-height-title"
          style={{ fontFamily: 'Great Vibes, cursive' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Cuenta Regresiva
          <motion.span
            className="absolute -top-1 -left-4 text-sm opacity-25 small-height-hide-decoration"
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 0.25, rotate: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            🌾
          </motion.span>
        </motion.h2>

        <motion.div
          className="text-right space-y-6 relative small-height-compact"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="flex justify-end items-center space-x-2 small-height-hide-decoration">
            <motion.span
              className="text-3xl small-height-emoji"
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 8, delay: 2 }}
            >
              ⏳
            </motion.span>
            <motion.span
              className="text-lg opacity-30 small-height-emoji"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 3 }}
            >
              👢
            </motion.span>
          </div>
          <h3 className="text-xl font-bold text-purple-800 drop-shadow-md small-height-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>8 de Noviembre, 2025</h3>
          
          <div className="grid grid-cols-2 gap-4 mt-6 small-height-countdown-grid">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                className="text-right space-y-2 relative small-height-countdown-item"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (index * 0.1), duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl small-height-emoji">{unit.emoji}</div>
                <div className="text-3xl font-bold text-purple-800 drop-shadow-md small-height-countdown-number" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-purple-700 opacity-90 drop-shadow-sm small-height-countdown-label" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {unit.label}
                </div>
                {index === 0 && (
                  <motion.span
                    className="absolute -top-2 -left-4 text-xs opacity-20 small-height-hide-decoration"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ delay: 2, duration: 0.8 }}
                  >
                    🐎
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-right space-y-3 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="flex justify-end items-center space-x-1">
            <motion.span
              className="text-2xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 4 }}
            >
              💫
            </motion.span>
            <motion.span
              className="text-sm opacity-25"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 5 }}
            >
              🌟
            </motion.span>
          </div>
          <p className="text-purple-700 text-base leading-relaxed drop-shadow-md pl-20" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            ¡Cada segundo cuenta para este momento tan especial!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CountdownSection;