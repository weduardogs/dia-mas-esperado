import { motion } from 'framer-motion';

interface FamilyMember {
  name: string;
  role: string;
}

interface FamilySectionProps {
  parents: FamilyMember[];
  godparents: FamilyMember[];
}

const FamilySection: React.FC<FamilySectionProps> = ({ parents, godparents }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-19 relative small-height-section">
      {/* Discreet cowboy decorative elements */}
      <motion.div
        className="absolute top-16 right-8 text-xl opacity-15 small-height-reduce-decoration"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.15, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        🤠
      </motion.div>

      <motion.div
        className="absolute bottom-24 left-16 text-lg opacity-20 small-height-reduce-decoration"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        ⭐
      </motion.div>

      <div className="max-w-lg ml-auto text-right pl-20 small-height-container">
        <motion.h2 
          className="text-5xl sm:text-4xl font-bold text-purple-700 mb-6 drop-shadow-lg pr-4 relative small-height-title"
          style={{ fontFamily: 'Great Vibes, cursive' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Mi Familia
          <motion.span
            className="absolute -top-1 -right-8 text-sm opacity-25 small-height-hide-decoration"
            initial={{ opacity: 0, rotate: -15 }}
            animate={{ opacity: 0.25, rotate: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            🌾
          </motion.span>
        </motion.h2>

        {/* Parents Section */}
        <motion.div
          className="text-right space-y-3 pr-4 mt-4 relative small-height-spacing"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="flex justify-end items-center space-x-2 mb-1 small-height-hide-decoration">
            <motion.span
              className="text-2xl small-height-emoji"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3, delay: 2 }}
            >
              👨‍👩‍👧
            </motion.span>
            <motion.span
              className="text-lg opacity-30 small-height-emoji"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 2.5 }}
            >
              👢
            </motion.span>
          </div>
          <h3 className="text-lg font-semibold text-purple-700 drop-shadow-md small-height-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>Mis Padres</h3>
          <div className="space-y-1">
            {parents.map((parent, index) => (
              <motion.div
                key={index}
                className="text-white relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (index * 0.1), duration: 0.6 }}
              >
                <p className="text-lg font-medium drop-shadow-md text-purple-700 small-height-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>{parent.name}</p>
                <p className="text-lg opacity-80 drop-shadow-sm text-purple-800 small-height-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>{parent.role}</p>
                {index === 0 && (
                  <motion.span
                    className="absolute -left-6 top-0 text-xs opacity-20 small-height-hide-decoration"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                  >
                    🌟
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Godparents Section */}
        <motion.div
          className="text-right space-y-1 pr-4 small-height-spacing"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="flex justify-end items-center space-x-2 small-height-hide-decoration">
            <motion.span
              className="text-2xl small-height-emoji"
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 3 }}
            >
              ✨
            </motion.span>
            <motion.span
              className="text-sm opacity-25 small-height-emoji"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 3.5, delay: 2 }}
            >
              🐎
            </motion.span>
          </div>
          <h3 className="text-lg font-semibold text-purple-700 mb-2 drop-shadow-md small-height-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>Mis Padrinos</h3>
          <div className="space-y-1">
            {godparents.map((godparent, index) => (
              <motion.div
                key={index}
                className="text-white"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + (index * 0.1), duration: 0.6 }}
              >
                <p className="text-lg font-medium drop-shadow-md text-purple-700 small-height-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>{godparent.name}</p>
                <p className="text-lg opacity-80 drop-shadow-sm text-purple-800 small-height-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>{godparent.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-purple-700 text-3xl opacity-90 italic mt-8 drop-shadow-md pl-19 pr-4 relative small-height-large-text"
          style={{ fontFamily: 'Great Vibes, cursive' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          "La familia es el tesoro más grande que tengo"
          <motion.span
            className="absolute -bottom-4 right-0 text-sm opacity-30 small-height-hide-decoration"
            initial={{ opacity: 0, rotate: 15 }}
            animate={{ opacity: 0.3, rotate: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            🌾
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};

export default FamilySection;