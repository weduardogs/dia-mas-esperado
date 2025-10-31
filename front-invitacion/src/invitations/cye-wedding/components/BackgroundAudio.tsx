import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BackgroundAudioProps {
  autoPlay?: boolean;
}

const BackgroundAudio: React.FC<BackgroundAudioProps> = ({ autoPlay = true }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      setIsMobile(isMobileDevice);
    };
    checkMobile();
  }, []);

  const attemptPlay = async () => {
    if (audioRef.current && !isPlaying) {
      try {
        // Set volume to ensure it's audible
        audioRef.current.volume = 0.7;
        await audioRef.current.play();
        setIsPlaying(true);
        setShowAudioPrompt(false);
      } catch (error) {
        // Autoplay blocked - show prompt on mobile
        if (isMobile && autoPlay && !hasUserInteracted) {
          setShowAudioPrompt(true);
        }
        console.log('Autoplay blocked, waiting for user interaction');
      }
    }
  };

  const handlePlayPause = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Error playing audio:', error);
        }
      }
    }
  };

  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const handleAudioLoad = () => {
    setIsLoaded(true);
    if (autoPlay) {
      attemptPlay();
    }
  };

  // Aggressive user interaction handling for mobile
  useEffect(() => {
    const handleUserInteraction = async () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        setShowAudioPrompt(false);

        if (autoPlay && isLoaded && !isPlaying) {
          // Try multiple times with slight delays for mobile browsers
          for (let i = 0; i < 3; i++) {
            try {
              await attemptPlay();
              break;
            } catch (error) {
              await new Promise(resolve => setTimeout(resolve, 100 * (i + 1)));
            }
          }
        }
      }
    };

    // More aggressive event listening for mobile
    const events = isMobile
      ? ['touchstart', 'touchend', 'click', 'tap', 'pointerdown', 'mousedown']
      : ['click', 'touchstart', 'keydown'];

    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, {
        once: false,
        passive: true,
        capture: true
      });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [autoPlay, isLoaded, isPlaying, hasUserInteracted, isMobile]);

  // Show audio prompt after a delay if autoplay fails on mobile
  useEffect(() => {
    if (isMobile && autoPlay && isLoaded && !isPlaying && !hasUserInteracted) {
      const timer = setTimeout(() => {
        setShowAudioPrompt(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isMobile, autoPlay, isLoaded, isPlaying, hasUserInteracted]);

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        preload="auto"
        loop
        autoPlay
        muted={false}
        playsInline
        crossOrigin="anonymous"
        onLoadedData={handleAudioLoad}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => console.error('Audio error:', e)}
        onCanPlayThrough={() => {
          // Additional attempt when audio is fully loaded
          if (autoPlay && !isPlaying && !hasUserInteracted) {
            setTimeout(attemptPlay, 100);
          }
        }}
      >
        <source src="/slide_away.m4a" type="audio/mp4" />
        <source src="/slide_away.m4a" type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>

      {/* Audio Controls Floating Button */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-20 right-4 z-50 flex flex-col space-y-2"
          >
            {/* Play/Pause Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePlayPause}
              className="bg-sage-green bg-opacity-90 hover:bg-opacity-100 text-white p-3 rounded-full shadow-lg transition-all duration-300"
              aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </motion.button>

            {/* Mute/Unmute Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleMuteToggle}
              className="bg-burgundy bg-opacity-90 hover:bg-opacity-100 text-white p-3 rounded-full shadow-lg transition-all duration-300"
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {isMuted ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
              )}
            </motion.button>

            {/* Music Note Indicator */}
            {isPlaying && (
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="bg-gold bg-opacity-90 p-2 rounded-full self-center"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
                </svg>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Audio Prompt Overlay */}
      <AnimatePresence>
        {showAudioPrompt && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4"
            onClick={async () => {
              setHasUserInteracted(true);
              await attemptPlay();
            }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white/95 rounded-lg p-6 text-center max-w-sm mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">🎵</div>
              <h3 className="text-xl font-elegant text-sage-green mb-2">
                ¡Activa la Música!
              </h3>
              <p className="text-burgundy text-sm mb-6 leading-relaxed">
                Para una experiencia completa, toca el botón para escuchar nuestra canción especial durante la invitación.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={async () => {
                  setHasUserInteracted(true);
                  await attemptPlay();
                }}
                className="w-full bg-sage-green hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span>Reproducir Música</span>
              </motion.button>
              <button
                onClick={() => {
                  setShowAudioPrompt(false);
                  setHasUserInteracted(true);
                }}
                className="mt-3 text-burgundy text-sm opacity-75 hover:opacity-100 transition-opacity"
              >
                Continuar sin música
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BackgroundAudio;