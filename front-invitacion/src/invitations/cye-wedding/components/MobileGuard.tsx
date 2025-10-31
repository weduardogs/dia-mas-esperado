import { useState, useEffect, ReactNode } from 'react';
import { isMobileDevice } from '../utils/deviceDetection';
import MobileOnlyMessage from './MobileOnlyMessage';

interface MobileGuardProps {
  children: ReactNode;
  mobileOnly?: boolean;
}

const MobileGuard: React.FC<MobileGuardProps> = ({ children, mobileOnly = true }) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if mobile-only restriction is enabled
    if (!mobileOnly) {
      setIsMobile(true); // Allow access on all devices
      setIsLoading(false);
      return;
    }

    // Small delay to ensure proper detection after page load
    const checkDevice = () => {
      const mobileDetected = isMobileDevice();
      setIsMobile(mobileDetected);
      setIsLoading(false);
    };

    // Check immediately
    checkDevice();

    // Also check on window resize to catch device orientation changes
    const handleResize = () => {
      checkDevice();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', checkDevice);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, [mobileOnly]);

  // Show loading while determining device type
  if (isLoading || isMobile === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wedding">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center">
          <div className="text-6xl mb-4 animate-pulse">💕</div>
          <p className="text-sage-green text-xl font-semibold font-elegant">
            Cargando invitación...
          </p>
        </div>
      </div>
    );
  }

  // Show desktop fallback message if not mobile
  if (!isMobile) {
    return <MobileOnlyMessage />;
  }

  // Show the invitation if mobile device is detected
  return <>{children}</>;
};

export default MobileGuard;
