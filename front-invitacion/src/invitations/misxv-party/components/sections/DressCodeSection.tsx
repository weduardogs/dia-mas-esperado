import { motion } from 'framer-motion';

interface DressCodeSectionProps {
  theme: string;
  specialNote?: string;
}

const DressCodeSection: React.FC<DressCodeSectionProps> = ({ theme, specialNote }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative small-height-section">
      {/* Discreet cowboy decorative elements */}
      <motion.div
        className="absolute top-28 left-10 text-xl opacity-15 small-height-reduce-decoration"
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ delay: 1.1, duration: 1 }}
      >
        🌾
      </motion.div>

      <motion.div
        className="absolute bottom-28 right-6 text-lg opacity-20 small-height-reduce-decoration"
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
          Vestimenta
          <motion.span
            className="absolute -top-2 -right-8 text-sm opacity-25 small-height-hide-decoration"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.25, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            🤠
          </motion.span>
        </motion.h2>


        {/* Theme */}
        <motion.div
          className="text-right space-y-3 pr-4 relative small-height-spacing"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="flex justify-end items-center space-x-2 small-height-hide-decoration">
            <motion.span
              className="text-3xl small-height-emoji"
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 6, delay: 2 }}
            >
              ✨
            </motion.span>
            <motion.span
              className="text-lg opacity-30 small-height-emoji"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 2.5 }}
            >
              👢
            </motion.span>
          </div>
          <h3 className="text-2xl font-bold text-purple-800 drop-shadow-md small-height-subtitle" style={{ fontFamily: 'Montserrat, sans-serif' }}>Temática</h3>
          <p className="text-purple-700 text-xl font-semibold drop-shadow-md small-height-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>{theme}</p>
          <motion.span
            className="absolute -right-6 top-8 text-xs opacity-20 small-height-hide-decoration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            🐎
          </motion.span>
        </motion.div>

        {/* Special Note */}
        {specialNote && (
          <motion.div
            className="text-right space-y-3 pl-10 pr-4 relative small-height-spacing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="flex justify-end items-center space-x-2 small-height-hide-decoration">
              <motion.span
                className="text-2xl small-height-emoji"
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 3 }}
              >
                💜
              </motion.span>
              <motion.span
                className="text-sm opacity-25 small-height-emoji"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, delay: 3.5 }}
              >
                🌟
              </motion.span>
            </div>
            <p className="text-purple-700 text-lg leading-relaxed drop-shadow-md pl-20 small-height-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {specialNote}
            </p>
          </motion.div>
        )}

        <motion.div
          className="text-purple-700 text-3xl leading-relaxed italic mt-10 drop-shadow-md pl-28 pr-4 relative small-height-large-text"
          style={{ fontFamily: 'Great Vibes, cursive' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          "Que tu elegancia combine con la mía"
          <motion.span
            className="absolute -bottom-4 right-10 text-sm opacity-25 small-height-hide-decoration"
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

export default DressCodeSection;