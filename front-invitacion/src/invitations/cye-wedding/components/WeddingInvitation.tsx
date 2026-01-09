import React from 'react';
import { motion } from 'framer-motion';
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
import { useTranslation } from '../i18n/useTranslation';

interface WeddingInvitationProps {
  familyData: FamilyData;
  onLogout: () => void;
}

const WeddingInvitation: React.FC<WeddingInvitationProps> = ({ familyData, onLogout }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative"
    >
      {/* Background Audio */}
      <BackgroundAudio autoPlay={true} />

      {/* Logout Button - Fixed at top right */}
      <div className="fixed top-0 right-0 z-50 p-4">
        <motion.button
          onClick={onLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-sage-green/90 backdrop-blur-sm text-light-text hover:bg-opacity-100 smooth-transition text-sm px-4 py-2.5 rounded-xl shadow-lg font-medium tracking-wide"
        >
          {t('common', 'logout')}
        </motion.button>
      </div>

      {/* All Sections Stacked Vertically */}
      <div className="w-full">
        <CoverPage
          weddingData={weddingData}
          familyData={familyData}
          onNext={() => {}}
        />
        <CoupleAnimation onNext={() => {}} />
        <LocationSection
          location={weddingData.church}
          type="ceremony"
        />
        <LocationSection
          location={weddingData.reception}
          type="reception"
        />
        <ItinerarySection
          itinerary={weddingData.itinerary}
        />
        <NotesSection />
        <GiftRegistrySection />
        <VideoSection />
        <GuestListSection
          familyData={familyData}
        />
      </div>
    </motion.div>
  );
};

export default WeddingInvitation;