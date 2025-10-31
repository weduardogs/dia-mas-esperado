import { motion } from 'framer-motion';

const GiftsSection: React.FC = () => {
  const giftSuggestions = [
    {
      emoji: '🎁',
      title: 'Lo que tú desees',
      description: 'No importa si es grande o pequeño'
    },
    {
      emoji: '🌹',
      title: 'Tu Presencia',
      description: 'Es el regalo más valioso'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative small-height-section">
      {/* Discreet cowboy decorative elements */}
      <motion.div
        className="absolute top-20 left-8 text-xl opacity-15 small-height-reduce-decoration"
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ delay: 1.1, duration: 1 }}
      >
        🎁
      </motion.div>

      <motion.div
        className="absolute bottom-28 right-10 text-lg opacity-20 small-height-reduce-decoration"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        ⭐
      </motion.div>

      <div className="max-w-lg ml-auto text-right pl-18 small-height-container">
        <motion.h2 
          className="text-5xl font-bold text-purple-700 mb-6 drop-shadow-lg pr-4 relative small-height-title"
          style={{ fontFamily: 'Great Vibes, cursive' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Regalos
          <motion.span
            className="absolute -top-2 -right-8 text-sm opacity-25 small-height-hide-decoration"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.25, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            🎀
          </motion.span>
        </motion.h2>

        {/* Introduction Message */}
        <motion.div
          className="text-right space-y-3 pr-4 relative small-height-spacing"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="flex justify-end items-center space-x-2 small-height-hide-decoration">
            <motion.span
              className="text-3xl small-height-emoji"
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 6, delay: 2 }}
            >
              💝
            </motion.span>
            <motion.span
              className="text-lg opacity-30 small-height-emoji"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 2.5 }}
            >
              👢
            </motion.span>
          </div>
          <p className="text-purple-700 text-lg leading-relaxed drop-shadow-md small-height-text pl-20" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            No es necesaria la extravaganza, así que aquí te dejo un par de opciones:
          </p>
          <motion.span
            className="absolute -right-6 top-8 text-xs opacity-20 small-height-hide-decoration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            🌾
          </motion.span>
        </motion.div>

        {/* Gift Suggestions */}
        <motion.div
          className="text-right space-y-4 pr-4 mt-6 relative small-height-spacing"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {giftSuggestions.map((gift, index) => (
            <motion.div
              key={index}
              className="text-right space-y-1 relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + (index * 0.1), duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-end items-center space-x-2 small-height-hide-decoration">
                <motion.span
                  className="text-2xl small-height-emoji"
                  animate={{ 
                    scale: index === 3 ? [1, 1.1, 1] : [1, 1.05, 1],
                    rotate: index === 1 ? [0, 5, -5, 0] : 0
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2.5 + index * 0.5, 
                    delay: 3 + index * 0.2 
                  }}
                >
                  {gift.emoji}
                </motion.span>
              </div>
              <h3 className="text-lg font-semibold text-purple-800 drop-shadow-md small-height-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {gift.title}
              </h3>
              <p className="text-purple-700 text-sm opacity-90 drop-shadow-sm small-height-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {gift.description}
              </p>
              {index === 0 && (
                <motion.span
                  className="absolute -left-6 top-0 text-xs opacity-20 small-height-hide-decoration"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                >
                  🤠
                </motion.span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Final Quote */}
        <motion.div
          className="text-purple-700 text-3xl leading-relaxed italic mt-8 drop-shadow-md pl-20 pr-4 relative small-height-large-text"
          style={{ fontFamily: 'Great Vibes, cursive' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          "El mejor regalo es tenerte ahí conmigo"
          <motion.span
            className="absolute -bottom-4 right-0 text-sm opacity-25 small-height-hide-decoration"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.25, x: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            🌾
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};

export default GiftsSection;