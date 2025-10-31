import { useState, useEffect, useCallback } from 'react';

interface UseScrollNavigationProps {
  totalSections: number;
  onSectionChange: (section: number) => void;
}

export const useScrollNavigation = ({ 
  totalSections, 
  onSectionChange 
}: UseScrollNavigationProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToSection = useCallback((sectionIndex: number) => {
    if (sectionIndex >= 0 && sectionIndex < totalSections && !isScrolling) {
      setIsScrolling(true);
      setCurrentSection(sectionIndex);
      onSectionChange(sectionIndex);
      
      // Reset scrolling state after animation
      setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    }
  }, [totalSections, onSectionChange, isScrolling]);

  const scrollToNext = useCallback(() => {
    const nextSection = Math.min(currentSection + 1, totalSections - 1);
    scrollToSection(nextSection);
  }, [currentSection, totalSections, scrollToSection]);

  const scrollToPrevious = useCallback(() => {
    const prevSection = Math.max(currentSection - 1, 0);
    scrollToSection(prevSection);
  }, [currentSection, scrollToSection]);

  // Handle wheel events for desktop
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      e.preventDefault();
      
      if (e.deltaY > 0) {
        // Scrolling down
        scrollToNext();
      } else if (e.deltaY < 0) {
        // Scrolling up
        scrollToPrevious();
      }
    };

    // Only enable wheel navigation on larger screens
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    
    if (mediaQuery.matches) {
      document.addEventListener('wheel', handleWheel, { passive: false });
    }

    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.addEventListener('wheel', handleWheel, { passive: false });
      } else {
        document.removeEventListener('wheel', handleWheel);
      }
    };

    mediaQuery.addListener(handleMediaChange);

    return () => {
      document.removeEventListener('wheel', handleWheel);
      mediaQuery.removeListener(handleMediaChange);
    };
  }, [isScrolling, scrollToNext, scrollToPrevious]);

  // Handle touch events for mobile
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return;
      
      touchEndY = e.changedTouches[0].screenY;
      const deltaY = touchStartY - touchEndY;
      
      // Minimum swipe distance
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          // Swiping up (next section)
          scrollToNext();
        } else {
          // Swiping down (previous section)
          scrollToPrevious();
        }
      }
    };

    // Only enable touch navigation on mobile
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    
    if (mediaQuery.matches) {
      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchend', handleTouchEnd);
    }

    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchend', handleTouchEnd);
      } else {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchend', handleTouchEnd);
      }
    };

    mediaQuery.addListener(handleMediaChange);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      mediaQuery.removeListener(handleMediaChange);
    };
  }, [isScrolling, scrollToNext, scrollToPrevious]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          scrollToNext();
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          scrollToPrevious();
          break;
        case 'Home':
          e.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSection(totalSections - 1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isScrolling, scrollToNext, scrollToPrevious, scrollToSection, totalSections]);

  return {
    currentSection,
    isScrolling,
    scrollToSection,
    scrollToNext,
    scrollToPrevious
  };
};