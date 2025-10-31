import { useState, useEffect, ReactNode } from 'react';
import { isMobileDevice } from '../utils/deviceDetection';
import { xvPartyConfig } from '../utils/partyData';
import MobileOnlyMessage from './MobileOnlyMessage';

interface MobileGuardProps {
  children: ReactNode;
}

const MobileGuard: React.FC<MobileGuardProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if mobile-only restriction is enabled
    if (!xvPartyConfig.mobileOnly) {
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
  }, [xvPartyConfig.mobileOnly]);

  // Show loading while determining device type
  if (isLoading || isMobile === null) {
    return (
      <div className="min-h-screen flex items-center justify-center"
           style={{
             backgroundImage: `url('/xv/fondo_xv.gif')`,
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundRepeat: 'no-repeat',
             backgroundAttachment: 'fixed'
           }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center">
          <div className="text-6xl mb-4 animate-pulse">💫</div>
          <p className="text-purple-700 text-xl font-semibold" style={{ fontFamily: 'Great Vibes, cursive' }}>
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