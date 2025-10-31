import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './components/Login';
import WeddingInvitation from './components/WeddingInvitation';
import MobileGuard from './components/MobileGuard';
import { FamilyData } from '../../types';
import { cyeWeddingConfig } from './utils/weddingData';

const CyeInvitation: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [familyData, setFamilyData] = useState<FamilyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedAuth = localStorage.getItem('wedding-auth-cye');
    const savedFamily = localStorage.getItem('wedding-family-cye');
    
    if (savedAuth === 'true' && savedFamily) {
      try {
        const parsedFamily = JSON.parse(savedFamily);
        setFamilyData(parsedFamily);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('wedding-auth-cye');
        localStorage.removeItem('wedding-family-cye');
      }
    }
    
    setIsLoading(false);
  }, []);

  const handleLogin = (family: FamilyData) => {
    setFamilyData(family);
    setIsAuthenticated(true);
    localStorage.setItem('wedding-auth-cye', 'true');
    localStorage.setItem('wedding-family-cye', JSON.stringify(family));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setFamilyData(null);
    localStorage.removeItem('wedding-auth-cye');
    localStorage.removeItem('wedding-family-cye');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-wedding flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-gold text-2xl font-elegant"
        >
          Cargando...
        </motion.div>
      </div>
    );
  }

  return (
    <MobileGuard mobileOnly={cyeWeddingConfig.mobileOnly}>
      <div className="min-h-screen bg-wedding">
        <div className="min-h-screen bg-black bg-opacity-20">
          <AnimatePresence mode="wait">
            {!isAuthenticated ? (
              <Login key="login" onLogin={handleLogin} />
            ) : (
              <WeddingInvitation
                key="invitation"
                familyData={familyData!}
                onLogout={handleLogout}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </MobileGuard>
  );
};

export default CyeInvitation;