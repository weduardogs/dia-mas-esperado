import { motion } from 'framer-motion';

interface Venue {
  name: string;
  address: string;
}

interface EventSectionProps {
  reception: Venue;
}

const EventSection: React.FC<EventSectionProps> = ({ reception }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-19 relative small-height-section">
      {/* Discreet cowboy decorative elements */}
      <motion.div
        className="absolute top-20 left-8 text-xl opacity-15 small-height-reduce-decoration"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        🤠
      </motion.div>

      <motion.div
        className="absolute bottom-16 right-12 text-lg opacity-20 small-height-reduce-decoration"
        initial={{ opacity: 0, rotate: -15 }}
        animate={{ opacity: 0.2, rotate: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        🌾
      </motion.div>

      <div className="max-w-lg ml-auto text-right pl-18 small-height-container small-height-compact">
        <motion.h2 
          className="text-5xl font-bold text-purple-700 mb-6 drop-shadow-lg pr-4 relative small-height-title"
          style={{ fontFamily: 'Great Vibes, cursive' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Evento
          <motion.span
            className="absolute -top-2 -left-6 text-sm opacity-25 small-height-hide-decoration"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            ⭐
          </motion.span>
        </motion.h2>

        {/* Reception Details */}
        <motion.div
          className="text-right space-y-3 pr-4 relative small-height-spacing"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="flex justify-end items-center space-x-2 mb-2 small-height-hide-decoration">
            <motion.span
              className="text-2xl small-height-emoji"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 2 }}
            >
              📍
            </motion.span>
            <motion.span
              className="text-lg opacity-30 small-height-emoji"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 2.8 }}
            >
              👢
            </motion.span>
          </div>
          <h3 className="text-2xl font-bold text-purple-800 drop-shadow-md small-height-subtitle" style={{ fontFamily: 'Montserrat, sans-serif' }}>Recepción</h3>

          <div className="text-purple-800 space-y-2 small-height-compact">
            <p className="text-xl font-medium drop-shadow-md small-height-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>{reception.name}</p>
            <p className="text-m opacity-90 drop-shadow-sm leading-relaxed pl-10 small-height-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>{reception.address}</p>
          </div>
        </motion.div>

        {/* Embedded Map */}
        <motion.div
          className="text-right space-y-3 pr-4 relative small-height-spacing"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <motion.div
            className="absolute -top-4 right-0 text-sm opacity-25 small-height-hide-decoration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            🐎
          </motion.div>
          
          <div className="flex justify-end">
            <motion.div
              className="rounded-lg overflow-hidden shadow-lg border-2 border-white/20 backdrop-blur-sm relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.077203772675!2d-99.09718628201588!3d19.785017006104905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d18c738b6192cd%3A0x89f3738c90861dd4!2sSal%C3%B3n%20y%20Finca%20%22El%20Arroyo%22!5e0!3m2!1ses-419!2smx!4v1757472203931!5m2!1ses-419!2smx" 
                width="280" 
                height="200" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación del evento - Salón El Arroyo"
                className="small-height-map"
              />
              <motion.div
                className="absolute bottom-2 right-2 text-xs opacity-30 small-height-hide-decoration"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 2.5, duration: 0.8 }}
              >
                🌟
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="text-purple-700 text-3xl leading-relaxed italic mt-6 drop-shadow-md pr-4 relative"
          style={{ fontFamily: 'Great Vibes, cursive' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          "Tu presencia es el mejor regalo"
          <motion.span
            className="absolute -bottom-3 right-8 text-sm opacity-25"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.25, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            🌾
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};

export default EventSection;