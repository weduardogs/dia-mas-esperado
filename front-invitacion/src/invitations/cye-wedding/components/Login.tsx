import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FamilyData } from '../../../types';

interface LoginProps {
  onLogin: (familyData: FamilyData) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [familyPasswords, setFamilyPasswords] = useState<FamilyData[]>([]);

  // Load family data from JSON file
  useEffect(() => {
    const loadFamilyData = async () => {
      try {
        const response = await fetch('/cye-wedding-families.json');
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Familias cargadas:', data.length, 'familias');
          console.log('📋 Passwords disponibles:', data.map((f: FamilyData) => f.password));
          setFamilyPasswords(data);
        } else {
          console.error('❌ Error loading family data - Status:', response.status);
        }
      } catch (error) {
        console.error('❌ Error fetching family data:', error);
      }
    };

    loadFamilyData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      console.log('🔍 Buscando password:', password.toLowerCase().trim());
      console.log('📦 Total familias disponibles:', familyPasswords.length);

      const familyData = familyPasswords.find(
        family => family.password.toLowerCase() === password.toLowerCase().trim()
      );

      if (familyData) {
        console.log('✅ Login exitoso para:', familyData.familyName);
        onLogin(familyData);
      } else {
        console.log('❌ Password no encontrado');
        setError('Contraseña incorrecta. Por favor, intenta nuevamente.');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white/50 rounded-lg p-8 w-full max-w-md mx-4 shadow-lg"
      >
        <div className="text-center mb-8">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-4xl md:text-5xl font-parisienne text-sage-green mb-2"
          >
            Nuestra Invitación Especial
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <label 
              htmlFor="password" 
              className="block text-sm font-medium font-raleway text-burgundy mb-2"
            >
              Código de Acceso
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-off-white border border-sage-green rounded-lg focus:ring-2 focus:ring-sage-green focus:border-transparent text-black placeholder-gray-500 transition-all duration-200"
              placeholder="Ingresa tu código de familia"
              required
              disabled={isLoading}
            />
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-300 text-sm bg-red-900 bg-opacity-30 p-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-sage-green hover:bg-opacity-80 text-off-white font-raleway font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verificando...
              </span>
            ) : (
              'Acceder a la Invitación'
            )}
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-center mt-6 text-sm font-raleway text-burgundy opacity-75"
        >
          Si no tienes tu código, contacta a los novios
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;