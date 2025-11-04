import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FamilyData } from '../../../types';
import CoverPage from './CoverPage';
import CoupleAnimation from './CoupleAnimation';
import LocationSection from './LocationSection';
import ItinerarySection from './ItinerarySection';
import NotesSection from './NotesSection';
import GiftRegistrySection from './GiftRegistrySection';
import VideoSection from './VideoSection';
import GuestListSection from './GuestListSection';
import BackgroundAudio from './BackgroundAudio';
import { weddingData } from '../utils/weddingData';
import { useScrollNavigation } from '../hooks/useScrollNavigation';

interface WeddingInvitationProps {
  familyData: FamilyData;
  onLogout: () => void;
}

const WeddingInvitation: React.FC<WeddingInvitationProps> = ({ familyData, onLogout }) => {
  const sections = [
    'cover',
    'animation',
    'church',
    'reception',
    'itinerary',
    'notes',
    'gifts',
    'video',
    'guests'
  ];

  const { 
    currentSection, 
    scrollToSection, 
    scrollToNext, 
    isScrolling 
  } = useScrollNavigation({
    totalSections: sections.length,
    onSectionChange: () => {
      // Optional: Add any additional logic when section changes
    }
  });


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative"
    >
      {/* Background Audio */}
      <BackgroundAudio autoPlay={true} />

      {/* Logout Button Only */}
      <div className="fixed top-0 right-0 z-50 p-4">
        <button
          onClick={onLogout}
          className="bg-sage-green text-light-text hover:bg-opacity-80 transition-colors text-sm px-3 py-2 rounded"
        >
          Salir
        </button>
      </div>

      {/* Section Content */}
      <div className="transition-all duration-500 ease-in-out mobile-scroll-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ 
              duration: 0.6, 
              ease: "easeInOut",
              type: "tween"
            }}
          >
          {currentSection === 0 && (
            <CoverPage 
              weddingData={weddingData}
              familyData={familyData}
              onNext={scrollToNext}
            />
          )}
          {currentSection === 1 && (
            <CoupleAnimation onNext={scrollToNext} />
          )}
          {currentSection === 2 && (
            <LocationSection 
              location={weddingData.church}
              title="Ceremonia Religiosa"
            />
          )}
          {currentSection === 3 && (
            <LocationSection 
              location={weddingData.reception}
              title="Recepción"
            />
          )}
          {currentSection === 4 && (
            <ItinerarySection
              itinerary={weddingData.itinerary}
            />
          )}
          {currentSection === 5 && (
            <NotesSection />
          )}
          {currentSection === 6 && (
            <GiftRegistrySection />
          )}
          {currentSection === 7 && (
            <VideoSection />
          )}
          {currentSection === 8 && (
            <GuestListSection
              familyData={familyData}
            />
          )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop Navigation Buttons - Hidden on Mobile */}
      <div className="hidden md:flex fixed bottom-8 left-1/2 transform -translate-x-1/2 space-x-4 z-40">
        {currentSection > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => scrollToSection(currentSection - 1)}
            className="bg-gold-dark bg-opacity-80 hover:bg-opacity-100 text-black px-4 py-2 rounded-full transition-all duration-300 font-medium"
            disabled={isScrolling}
          >
            ← Anterior
          </motion.button>
        )}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={scrollToNext}
          className="bg-gold bg-opacity-80 hover:bg-opacity-100 text-black px-4 py-2 rounded-full transition-all duration-300 font-medium"
          disabled={isScrolling}
        >
          {currentSection === sections.length - 1 ? 'Volver al inicio' : 'Siguiente →'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WeddingInvitation;