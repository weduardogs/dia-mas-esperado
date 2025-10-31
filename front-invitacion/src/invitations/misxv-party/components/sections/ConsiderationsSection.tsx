import { motion } from 'framer-motion';

const ProgramSection: React.FC = () => {
  const programItems = [
    {
      time: '2:30 pm',
      activity: 'Misa',
      emoji: '🙏🏻'
    },
    {
      time: '4:00 pm',
      activity: 'Recepción',
      emoji: '🍹'
    },
    {
      time: '4:30 pm',
      activity: 'Show Ecuestre',
      emoji: '🐎'
    },
    {
      time: '5:30 pm',
      activity: 'Ingreso al Salón',
      emoji: '🎉'
    },
    {
      time: '6:00 pm',
      activity: 'Cena',
      emoji: '🍝'
    },
    {
      time: '7:00 pm',
      activity: 'Baile de XV',
      emoji: '💃🏻'
    },
    {
      time: '11:00 pm',
      activity: 'Evento Sorpresa',
      emoji: '🙊'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative small-height-section">
      {/* Discreet cowboy decorative elements */}
      <motion.div
        className="absolute top-16 left-8 text-xl opacity-15 small-height-reduce-decoration"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        👢
      </motion.div>

      <motion.div
        className="absolute bottom-24 right-16 text-lg opacity-20 small-height-reduce-decoration"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ delay: 1.7, duration: 1 }}
      >
        🤠
      </motion.div>

      <div className="max-w-lg ml-auto text-right pl-8 pr-5 space-y-8 small-height-container small-height-compact">
        <motion.h2 
          className="text-4xl font-bold text-purple-700 mb-6 drop-shadow-lg relative small-height-title"
          style={{ fontFamily: 'Great Vibes, cursive' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Programa
          <motion.span
            className="absolute -top-1 -right-6 text-sm opacity-25 small-height-hide-decoration"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.25, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            ⭐
          </motion.span>
        </motion.h2>

        <motion.div
          className="text-right space-y-3 mb-6 relative small-height-spacing"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="flex justify-end items-center space-x-2 small-height-hide-decoration">
            <motion.span
              className="text-3xl small-height-emoji"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3, delay: 2.5 }}
            >
              📅
            </motion.span>
            <motion.span
              className="text-lg opacity-30 small-height-emoji"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 3 }}
            >
              🌾
            </motion.span>
          </div>
          <h3 className="text-xl font-bold text-purple-800 drop-shadow-md small-height-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>8 de Noviembre, 2025</h3>
        </motion.div>

        <div className="space-y-4 small-height-compact">
          {programItems.map((item, index) => (
            <motion.div
              key={index}
              className="text-right space-y-2 relative small-height-spacing"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1), duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-end items-center space-x-3">
                <div className="text-right">
                  <p className="text-purple-800 text-base font-medium drop-shadow-md small-height-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {item.activity}
                  </p>
                  <p className="text-purple-700 text-sm opacity-90 drop-shadow-sm small-height-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {item.time}
                  </p>
                </div>
                <div className="text-2xl small-height-emoji">{item.emoji}</div>
              </div>
              {index === 2 && ( // Show Ecuestre - add horse decoration
                <motion.span
                  className="absolute -right-8 top-0 text-sm opacity-25 small-height-hide-decoration"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.25 }}
                  transition={{ delay: 2 + (index * 0.1), duration: 0.8 }}
                >
                  🐎
                </motion.span>
              )}
              {index === 5 && ( // Baile de XV - add star decoration
                <motion.span
                  className="absolute -left-6 top-1 text-xs opacity-20 small-height-hide-decoration"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  transition={{ delay: 2.5 + (index * 0.1), duration: 0.8 }}
                >
                  🌟
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramSection;