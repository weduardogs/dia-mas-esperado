import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Location } from '../../../types';

interface LocationSectionProps {
  location: Location;
  title: string;
}

const LocationSection: React.FC<LocationSectionProps> = ({ 
  location, 
  title 
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-center p-4">
      <div className="mobile-content-container mobile-safe-area md:contents">

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/50 rounded-lg p-8 w-full max-w-md mx-4 shadow-lg"
        >

          {/* Location Name */}
          <div className="text-center">
            <h3 className="text-4xl md:text-3xl font-elegant font-bold text-sage-green mb-2">
              {location.name}
            </h3>
          </div>

          {/* Time */}
          <div className="flex items-start justify-center space-x-3">
            <svg className="w-6 h-6 text-burgundy mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <div className="text-center">
              <p className="text-burgundy font-medium text-lg">{title === "Ceremonia Religiosa" ? "4:00 PM" : "6:00 PM"}</p>
            </div>
          </div>

          {/* Google Map */}
          <div>
            
            <div className="relative h-64 rounded-lg overflow-hidden bg-black bg-opacity-50 mb-4 mt-2">
              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-gold-light text-lg">Cargando mapa...</div>
                </div>
              )}
              
              {title === "Ceremonia Religiosa" ? (
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d931.7074795110356!2d-98.98818460485866!3d19.372807064554888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1e2eafe4ae79f%3A0x7372b48e3a4b9089!2sParroquia%20de%20Nuestra%20Se%C3%B1ora%20de%20las%20Nieves!5e0!3m2!1ses-419!2smx!4v1754956610460!5m2!1ses-419!2smx"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'sepia(20%) saturate(120%) hue-rotate(15deg)' }} 
                  allowFullScreen
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={handleMapLoad}
                  className={mapLoaded ? 'opacity-100' : 'opacity-0'}
                />
              ) : (
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.1993066655145!2d-98.98606956385498!3d19.360520901602815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1e3ccad5ed925%3A0xa1707497cd25f79d!2sLa%20Cava%20By%20Eventos%20Premier%20GHR!5e0!3m2!1ses-419!2smx!4v1754956821286!5m2!1ses-419!2smx"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'sepia(20%) saturate(120%) hue-rotate(15deg)' }} 
                  allowFullScreen
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={handleMapLoad}
                  className={mapLoaded ? 'opacity-100' : 'opacity-0'}
                />
              )}
              
              {/* Fallback Static Map */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br from-gold-dark to-gold-light opacity-20 flex items-center justify-center ${mapLoaded ? 'hidden' : 'block'}`}
              >
                <div className="text-center">
                  <svg className="w-12 h-12 text-sage-green mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gold-light text-sm">
                    {location.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LocationSection;