import { useState, useEffect } from 'react';

export const useNavigation = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [previousSection, setPreviousSection] = useState<number | undefined>(undefined);
  
  const sections = [
    { id: 0, title: 'Inicio', label: 'Mis Quince' },
    { id: 1, title: 'Invitación', label: 'Invitación' },
    { id: 2, title: 'Familia', label: 'Familia' },
    { id: 3, title: 'Evento', label: 'Evento' },
    { id: 4, title: 'Vestimenta', label: 'Vestimenta' },
    { id: 5, title: 'Tiempo', label: 'Cuenta Regresiva' },
    { id: 6, title: 'Programa', label: 'Programa' },
    { id: 7, title: 'Regalos', label: 'Regalos' },
    { id: 8, title: 'Confirmación', label: 'RSVP' }
  ];

  const goToSection = (sectionId: number) => {
    if (sectionId >= 0 && sectionId < sections.length) {
      setPreviousSection(currentSection);
      setCurrentSection(sectionId);
    }
  };

  const nextSection = () => {
    setPreviousSection(currentSection);
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Carousel mode: go back to first section
      setCurrentSection(0);
    }
  };

  const prevSection = () => {
    setPreviousSection(currentSection);
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else {
      // Carousel mode: go to last section
      setCurrentSection(sections.length - 1);
    }
  };

  // Touch swipe functionality
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe) {
      nextSection();
    }
    if (isDownSwipe) {
      prevSection();
    }
  };

  useEffect(() => {
    const element = document.body;
    
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [touchStart, touchEnd, currentSection]);

  return {
    currentSection,
    previousSection,
    sections,
    goToSection,
    nextSection,
    prevSection,
    isFirst: currentSection === 0,
    isLast: currentSection === sections.length - 1
  };
};