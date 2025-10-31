import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NotesSection: React.FC = () => {
  const [currentGroup, setCurrentGroup] = useState(0);

  const notes = [
    {
      icon: '👶',
      title: 'Niños Bienvenidos',
      description: 'Nos encantaría que los niños nos acompañen en esta celebración tan especial. Contamos contigo para su constante supervisión'
    },
    {
      icon: '👗',
      title: 'Vestimenta',
      description: 'Formal / Cocktail',
      showColors: true
    },
    {
      icon: '⏰',
      title: 'Puntualidad',
      description: 'Llegar 15 min antes de la ceremonia'
    },
    {
      icon: '🎉',
      title: 'Sorpresas',
      description: '¡Y muchas más durante la celebración!'
    }
  ];

  // Split notes into groups of 2
  const firstGroup = notes.slice(0, 2);
  const secondGroup = notes.slice(2, 4);
  const groups = [firstGroup, secondGroup];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGroup(prev => (prev + 1) % groups.length);
    }, 10000); // 

    return () => clearInterval(interval);
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

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="mobile-content-container mobile-safe-area md:contents">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/50 rounded-lg p-6 w-full max-w-md mx-4 shadow-lg"
        >
          {/* Title */}
          <div className="text-center mb-6">
            <h3 className="text-4xl md:text-3xl font-elegant font-bold text-sage-green mb-2">
              Notas Importantes
            </h3>
          </div>

          {/* Animated Notes Groups */}
          <div className="min-h-[320px] flex items-center justify-center">
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
                  {groups[currentGroup]?.map((note, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-white bg-opacity-20 rounded-lg p-2 flex items-start space-x-3"
                    >
                      <span className="text-2xl flex-shrink-0 mt-1" role="img" aria-label="note-icon">
                        {note.icon}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-burgundy mb-1">
                          {note.title}
                        </h4>
                        <p className="text-burgundy opacity-90 text-sm leading-relaxed">
                          {note.description}
                        </p>
                        {note.showColors && (
                          <div className="mt-3">
                            <p className="text-burgundy text-xs font-medium mb-2">
                              Colores no permitidos:
                            </p>
                            <div className="flex gap-2">
                              <div
                                className="w-8 h-8 rounded-full border-2 border-gray-300 bg-white shadow-sm"
                                title="Blanco"
                              />
                              <div
                                className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-sm"
                                style={{ backgroundColor: '#CFB997' }}
                                title="Beige"
                              />
                              <div
                                className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-sm"
                                style={{ backgroundColor: '#A9BA9D' }}
                                title="Verde"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress indicators */}
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

          {/* Decorative Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center mt-6"
          >
            <div className="text-4xl text-gold-light opacity-90">
              📝
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotesSection;