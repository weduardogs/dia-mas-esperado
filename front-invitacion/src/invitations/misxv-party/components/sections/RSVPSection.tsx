import { motion } from 'framer-motion';

const RSVPSection: React.FC = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+524433585542"; // Replace with actual phone number
    const message = encodeURIComponent("Hola! Quiero confirmar mi asistencia a los XV años de Astrid 💕");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 safe-area-inset relative small-height-section">
      {/* Discreet cowboy decorative elements */}
      <motion.div
        className="absolute top-20 left-12 text-xl opacity-15 small-height-reduce-decoration"
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 0.15, rotate: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        🤠
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-8 text-lg opacity-20 small-height-reduce-decoration"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.2, y: 0 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        ⭐
      </motion.div>

      <div className="max-w-sm ml-auto w-full pr-4 text-right small-height-container small-height-compact">
        <motion.h2 
          className="text-4xl sm:text-4xl font-bold text-purple-700 mb-8 text-right drop-shadow-lg relative small-height-title"
          style={{ fontFamily: 'Great Vibes, cursive' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Confirma tu Asistencia
          <p className="text-purple-700 text-base mt-10 leading-relaxed drop-shadow-md pl-20" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Considere asistir sin niños
          </p>
          <p className="text-purple-700 text-base mt-3 leading-relaxed drop-shadow-md pl-20" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Coordinadora: Sara Valle
          </p>
          <motion.span
            className="absolute -top-10 right-6 text-sm opacity-25 small-height-hide-decoration"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            🌾
          </motion.span>
        </motion.h2>

        <motion.div
          className="space-y-8 text-center relative small-height-compact"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="flex justify-center items-center space-x-2">
            <motion.span
              className="text-5xl small-height-emoji"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 2 }}
            >
              💌
            </motion.span>
            <motion.span
              className="text-lg opacity-30 small-height-emoji small-height-hide-decoration"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 3 }}
            >
              👢
            </motion.span>
          </div>
          
          <motion.button
            onClick={handleWhatsAppClick}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-full border-2 border-green-400 transition-all duration-300 shadow-lg flex items-center justify-center mx-auto space-x-3 small-height-button"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
          >
            <svg 
              className="w-6 h-6" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
            </svg>
            <span>Confirmar por WhatsApp</span>
          </motion.button>

          <motion.p 
            className="text-right text-purple-700 text-xl leading-relaxed italic mt-6 drop-shadow-md pr-4 pl-20 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Tu confirmación es muy importante para nosotros
            <motion.span
              className="absolute -bottom-4 right-8 text-sm opacity-25"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.25, scale: 1 }}
              transition={{ delay: 2.5, duration: 0.8 }}
            >
              🐎
            </motion.span>
            <motion.span
              className="absolute -top-2 left-16 text-xs opacity-20"
              initial={{ opacity: 0, rotate: 15 }}
              animate={{ opacity: 0.2, rotate: 0 }}
              transition={{ delay: 3, duration: 0.8 }}
            >
              🌟
            </motion.span>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default RSVPSection;