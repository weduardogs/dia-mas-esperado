import { motion } from 'framer-motion';

interface MobileNavigationProps {
  currentSection: number;
  sections: Array<{ id: number; title: string; label: string }>;
  onNavigate: (sectionId: number) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  currentSection,
  sections,
  onNavigate
}) => {
  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="relative h-1 bg-white/10">
          <motion.div
            className="h-full bg-white/70"
            initial={{ width: 0 }}
            animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Section Dots - Only on larger screens, simplified */}
      <div className="hidden md:flex fixed right-4 top-1/2 transform -translate-y-1/2 z-40 flex-col space-y-3">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSection === section.id 
                ? 'bg-white scale-150' 
                : 'bg-white/40 hover:bg-white/70'
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            title={section.label}
          />
        ))}
      </div>

    </>
  );
};

export default MobileNavigation;