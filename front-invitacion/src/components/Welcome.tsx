import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen bg-wedding flex items-center justify-center">
      <div className="min-h-screen bg-black bg-opacity-20 flex items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto px-6"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-elegant text-gold mb-8"
          >
            Bienvenidos
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-light-text mb-12 font-light leading-relaxed"
          >
            Selecciona la invitación que deseas ver
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-6"
          >
            <Link to="/cye">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full max-w-md bg-gold bg-opacity-20 hover:bg-opacity-30 text-gold border-2 border-gold px-8 py-4 rounded-lg transition-all duration-300 font-medium text-lg backdrop-blur-sm"
              >
                Invitación C&E
              </motion.button>
            </Link>

            <Link to="/misxv">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full max-w-md bg-sage-green bg-opacity-20 hover:bg-opacity-30 text-sage-green border-2 border-sage-green px-8 py-4 rounded-lg transition-all duration-300 font-medium text-lg backdrop-blur-sm"
              >
                Mis XV Años
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16"
          >
            <p className="text-light-text text-sm opacity-70">
              Aplicación de Invitaciones Digitales
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;