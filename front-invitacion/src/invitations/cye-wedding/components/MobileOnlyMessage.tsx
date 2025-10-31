import { motion } from 'framer-motion';

const MobileOnlyMessage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden bg-wedding">
      {/* Background overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Decorative wedding elements */}
      <motion.div
        className="absolute top-20 left-10 text-6xl opacity-20"
        initial={{ opacity: 0, rotate: -15 }}
        animate={{ opacity: 0.2, rotate: 0 }}
        transition={{ duration: 1 }}
      >
        💍
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 text-5xl opacity-15"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.15, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        💐
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-20 text-4xl opacity-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        🕊️
      </motion.div>

      <motion.div
        className="absolute top-32 right-20 text-3xl opacity-15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        ❤️
      </motion.div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Mobile icon */}
          <motion.div
            className="text-8xl mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            📱
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-sage-green mb-6 drop-shadow-lg font-elegant"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Invitación Exclusiva
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            className="text-3xl md:text-4xl text-gold font-light mb-8 drop-shadow-md font-elegant"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            para Dispositivos Móviles
          </motion.h2>

          {/* Message box */}
          <motion.div
            className="bg-white/50 backdrop-blur-sm rounded-lg p-8 border border-white/30 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="space-y-6">
              <motion.div
                className="text-4xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 2 }}
              >
                💕✨
              </motion.div>

              <p className="text-burgundy text-xl md:text-2xl leading-relaxed font-semibold font-raleway">
                Esta invitación especial ha sido diseñada exclusivamente para dispositivos móviles.
              </p>

              <p className="text-burgundy opacity-90 text-lg md:text-xl font-raleway">
                Para una experiencia óptima, por favor accede desde tu teléfono móvil o tablet.
              </p>

              {/* QR code placeholder */}
              <motion.div
                className="mt-8 p-6 bg-white/30 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <p className="text-burgundy text-sm font-medium mb-4 font-raleway">
                  Escanea este QR desde tu móvil:
                </p>
                <div className="w-32 h-32 bg-white/50 rounded-lg mx-auto flex items-center justify-center text-4xl">
                  📱
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Additional decorative message */}
          <motion.div
            className="text-sage-green text-xl italic mt-8 drop-shadow-md font-elegant"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            "Una experiencia móvil, tan especial como este momento"

            <motion.div
              className="flex justify-center space-x-4 mt-6 text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                💍
              </motion.span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
              >
                💖
              </motion.span>
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
              >
                🌹
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MobileOnlyMessage;
