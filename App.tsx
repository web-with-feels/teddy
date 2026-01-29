import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import BackgroundEffects from './components/BackgroundEffects';
import HeroSection from './components/HeroSection';
import InteractiveSection from './components/InteractiveSection';
import LoveNotes from './components/LoveNotes';
import MemoryLane from './components/MemoryLane';
import Reasons from './components/Reasons';
import Finale from './components/Finale';

const App: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true); // Start muted to avoid autoplay issues
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Soft ambient playful/lullaby music
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/10/18/audio_31c2730e64.mp3?filename=lo-fi-lifestyle-114224.mp3'); 
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      // Unmute logic
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsMuted(false);
        }).catch(error => {
          console.error("Audio autoplay prevented:", error);
        });
      }
    } else {
      // Mute logic
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans">
      {/* Fixed Background */}
      <BackgroundEffects />

      {/* Main Content (z-index 10 to sit above background) */}
      <main className="relative z-10">
        <HeroSection />
        
        <div className="container mx-auto max-w-5xl">
          <InteractiveSection isMuted={isMuted} />
          <LoveNotes />
        </div>
        
        <MemoryLane />
        
        <div className="container mx-auto max-w-5xl">
          <Reasons />
        </div>
        
        <Finale />
      </main>

      {/* Floating Audio Control */}
      <button 
        onClick={toggleMute}
        className="fixed bottom-6 left-6 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full text-teddy-600 shadow-lg hover:bg-white transition-all hover:scale-110 border border-teddy-200"
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {/* Optional Music Credit / Footer */}
      <footer className="relative z-10 py-6 text-center text-teddy-400 text-sm">
        <p>Made with love for you. Happy Teddy Day.</p>
      </footer>
    </div>
  );
};

export default App;