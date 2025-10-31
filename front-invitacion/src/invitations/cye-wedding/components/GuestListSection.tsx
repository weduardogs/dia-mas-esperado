import React from 'react';
import { motion } from 'framer-motion';
import { FamilyData } from '../../../types';

interface GuestListSectionProps {
  familyData: FamilyData;
}

const GuestListSection: React.FC<GuestListSectionProps> = ({
  familyData
}) => {
  const whatsappNumber = "5215512345678"; // Número de WhatsApp de los novios
  const whatsappMessage = `¡Hola! Soy ${familyData.familyName}. Confirmo mi asistencia a la boda de Eduardo y Cecilia el 14 de Febrero. ¡No puedo esperar a celebrar con ustedes! 💕`;

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="mobile-content-container mobile-safe-area md:contents">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/50 rounded-lg p-8 w-full max-w-md mx-4 shadow-lg"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            {/* Title */}
            <motion.div variants={itemVariants} className="mb-6">
              <h3 className="text-4xl md:text-3xl font-elegant font-bold text-sage-green mb-2">
                Confirmación de Asistencia
              </h3>
            </motion.div>

            {/* Main Message */}
            <motion.div variants={itemVariants} className="mb-6">
              <p className="text-burgundy text-base leading-relaxed">
                Para confirmar tu asistencia a nuestra boda, por favor envíanos un mensaje por WhatsApp.
              </p>
            </motion.div>

            {/* WhatsApp Button */}
            <motion.div variants={itemVariants} className="mb-6">
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 text-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.309"/>
                </svg>
                <span>Confirmar</span>
              </button>
            </motion.div>

            {/* Additional Info */}
            <motion.div variants={itemVariants} className="bg-white bg-opacity-20 rounded-lg p-3">
              <p className="text-burgundy text-sm opacity-90">
                <span className="font-medium">💌 Importante:</span> Tu confirmación nos ayuda a organizar mejor este día especial
              </p>
            </motion.div>
          </motion.div>

          {/* Decorative Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center mt-6"
          >
            <div className="text-4xl text-gold-light opacity-30">
              💕
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default GuestListSection;