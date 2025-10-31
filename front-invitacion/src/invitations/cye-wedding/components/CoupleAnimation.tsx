import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CoupleAnimationProps {
  onNext: () => void;
}

const CoupleAnimation: React.FC<CoupleAnimationProps> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoAspectRatio, setVideoAspectRatio] = useState<number>(9/16); // Default vertical

  // Calculate video aspect ratio when metadata loads
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      const width = video.videoWidth;
      const height = video.videoHeight;
      const aspectRatio = width / height;
      setVideoAspectRatio(aspectRatio);
      console.log(`Video dimensions: ${width}x${height}, aspect ratio: ${aspectRatio.toFixed(2)}`);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Autoplay video when component mounts
  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          // Attempt to play the video
          await videoRef.current.play();
        } catch (error) {
          console.log('Autoplay prevented, waiting for user interaction');
        }
      }
    };

    // Try to play after a short delay to ensure DOM is ready
    const timer = setTimeout(playVideo, 300);

    return () => clearTimeout(timer);
  }, []);

  // Handle user interaction for mobile autoplay
  useEffect(() => {
    const handleInteraction = () => {
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {
          // Silently handle any play errors
        });
      }
    };

    // Listen for any user interaction
    document.addEventListener('touchstart', handleInteraction, { once: true });
    document.addEventListener('click', handleInteraction, { once: true });

    return () => {
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('click', handleInteraction);
    };
  }, []);

  return (
    <div className="h-[70vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-sage-green/20 via-transparent to-burgundy/20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full h-full flex items-center justify-center"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          style={{
            aspectRatio: videoAspectRatio.toString()
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/C&E.mov" type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>
      </motion.div>
    </div>
  );
};

export default CoupleAnimation;
