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
    <section className="w-full flex flex-col items-center py-8 px-4 mobile-safe-area">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-full max-w-md h-[70vh] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-sage-green/20 via-transparent to-burgundy/20"
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
    </section>
  );
};

export default CoupleAnimation;
