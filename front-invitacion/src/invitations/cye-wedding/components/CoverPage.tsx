import React from 'react';
import { motion } from 'framer-motion';
import { WeddingData, FamilyData } from '../../../types';
import { useTranslation } from '../i18n/useTranslation';

interface CoverPageProps {
  weddingData: WeddingData;
  familyData: FamilyData;
  onNext: () => void; // Kept for API compatibility
}

const CoverPage: React.FC<CoverPageProps> = ({ weddingData, familyData }) => {
  const { t } = useTranslation();

  return (
    <section className="w-full flex flex-col items-center text-center py-12 px-4 mobile-safe-area min-h-screen justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="glass-card rounded-3xl p-10 w-full max-w-md"
      >
        {/* Couple Names */}
        <div className="mb-8">
          <h1
            className="text-6xl sm:text-7xl md:text-8xl font-great-vibes text-sage-green mb-3 text-enhanced-shadow"
            style={{ letterSpacing: '0.01em' }}
          >
            {weddingData.brideName}
          </h1>

          <div className="text-5xl md:text-6xl font-great-vibes text-sage-green mb-3 animate-pulse-soft">
            &
          </div>

          <h1
            className="text-6xl sm:text-7xl md:text-8xl font-great-vibes text-sage-green text-enhanced-shadow"
            style={{ letterSpacing: '0.01em' }}
          >
            {weddingData.groomName}
          </h1>
        </div>

        {/* Wedding Announcement */}
        <h2 className="text-3xl md:text-4xl font-raleway font-semibold text-burgundy mb-6 tracking-wide">
          {t('cover', 'announcement')}
        </h2>

        {/* Personal Message */}
        {familyData.personalMessage && (
          <p className="text-burgundy font-raleway text-lg leading-relaxed mb-6 px-2">
            {familyData.personalMessage}
          </p>
        )}

        {/* Scroll Hint */}
        <div className="mt-6 text-burgundy opacity-70 text-sm">
          ↓ Desliza para ver más ↓
        </div>
      </motion.div>
    </section>
  );
};

export default CoverPage;