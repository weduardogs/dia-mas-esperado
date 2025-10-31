import { motion } from 'framer-motion';

interface InvitationSectionProps {
  celebrantName: string;
  personalMessage: string;
}

const InvitationSection: React.FC<InvitationSectionProps> = ({ celebrantName, personalMessage }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-19 relative small-height-section">
      {/* Discreet cowboy decorative elements */}
      <motion.div
        className="absolute top-24 left-12 text-2xl opacity-20 small-height-reduce-decoration"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        ⭐
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-16 text-xl opacity-15 small-height-reduce-decoration"
        initial={{ opacity: 0, rotate: 15 }}
        animate={{ opacity: 0.15, rotate: 0 }}
        transition={{ delay: 1.3, duration: 1 }}
      >
        🌾
      </motion.div>

      <div className="max-w-lg ml-auto text-right pl-20 small-height-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 small-height-compact"
        >
          {/* Subtle cowboy hat decoration */}
          <motion.div
            className="flex justify-end items-center mb-4 small-height-hide-decoration"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.span
              className="text-lg opacity-40 mr-2 small-height-emoji"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 2 }}
            >
              🤠
            </motion.span>
            <motion.span
              className="text-sm opacity-30 small-height-emoji"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
            >
              👢
            </motion.span>
          </motion.div>

          <motion.h2 
            className="text-5xl font-bold text-purple-700 drop-shadow-lg pr-4 relative small-height-title"
            style={{ fontFamily: 'Great Vibes, cursive' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.span
              className="absolute -top-2 -left-8 text-lg opacity-25 small-height-hide-decoration"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              🌟
            </motion.span>
          </motion.h2>

          <motion.div
            className="py-5 px-4 relative small-height-spacing"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-purple-700 text-3xl leading-relaxed mb-6 drop-shadow-md small-height-large-text" style={{ fontFamily: 'Great Vibes, cursive' }}>
              {personalMessage}
            </p>
            
            <div className="pt-4 relative">
              <p className="text-purple-700 text-xl font-semibold drop-shadow-md small-height-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Con mucho amor,
              </p>
              <p className="text-purple-800 text-4xl font-bold mt-2 drop-shadow-lg relative small-height-large-text" style={{ fontFamily: 'Great Vibes, cursive' }}>
                {celebrantName} 💕
                <motion.span
                  className="absolute -bottom-6 right-0 text-sm opacity-30 small-height-hide-decoration"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  transition={{ delay: 2, duration: 0.8 }}
                >
                  🐎
                </motion.span>
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default InvitationSection;