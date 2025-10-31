import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from './hooks/useNavigation';
import MobileNavigation from './components/MobileNavigation';
import MobileGuard from './components/MobileGuard';

// Section imports
import HeroSection from './components/sections/HeroSection';
import InvitationSection from './components/sections/InvitationSection';
import FamilySection from './components/sections/FamilySection';
import EventSection from './components/sections/EventSection';
import DressCodeSection from './components/sections/DressCodeSection';
import CountdownSection from './components/sections/CountdownSection';
import ProgramSection from './components/sections/ConsiderationsSection';
import GiftsSection from './components/sections/GiftsSection';
import RSVPSection from './components/sections/RSVPSection';

import { xvPartyConfig } from './utils/partyData';

const MisXvInvitation: React.FC = () => {
  const {
    currentSection,
    previousSection,
    sections,
    goToSection
  } = useNavigation();

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <HeroSection
            celebrantName={xvPartyConfig.celebrantName}
            message={xvPartyConfig.personalMessage}
            previousSection={previousSection}
          />
        );
      case 1:
        return (
          <InvitationSection
            celebrantName={xvPartyConfig.celebrantName}
            personalMessage={xvPartyConfig.invitationMessage}
          />
        );
      case 2:
        return (
          <FamilySection
            parents={xvPartyConfig.family.parents}
            godparents={xvPartyConfig.family.godparents}
          />
        );
      case 3:
        return (
          <EventSection
            reception={xvPartyConfig.event.reception}
          />
        );
      case 4:
        return (
          <DressCodeSection
            theme={xvPartyConfig.theme}
            specialNote={xvPartyConfig.specialNote}
          />
        );
      case 5:
        return (
          <CountdownSection eventDate={xvPartyConfig.date} />
        );
      case 6:
        return <ProgramSection />;
      case 7:
        return <GiftsSection />;
      case 8:
        return <RSVPSection />;
      default:
        return null;
    }
  };

  return (
    <MobileGuard>
      <div 
        className="min-h-screen relative overflow-hidden"
        style={{
          backgroundImage: `url('/xv/fondo_xv.gif')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Light overlay for text readability only */}
        <div className="absolute inset-0"></div>
        
        {/* Mobile Navigation */}
        <MobileNavigation
          currentSection={currentSection}
          sections={sections}
          onNavigate={goToSection}
        />
        
        {/* Content */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ 
                duration: 0.6, 
                ease: "easeInOut",
                type: "tween"
              }}
              className="min-h-screen"
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </MobileGuard>
  );
};

export default MisXvInvitation;