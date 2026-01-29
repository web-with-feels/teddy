import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeddyGraphic from './TeddyGraphic';
import { TEDDY_MESSAGES } from '../constants';
import { Sparkles } from 'lucide-react';

interface InteractiveSectionProps {
  isMuted: boolean;
}

const InteractiveSection: React.FC<InteractiveSectionProps> = ({ isMuted }) => {
  const [expression, setExpression] = useState<'happy' | 'blush' | 'hug' | 'neutral'>('neutral');
  const [message, setMessage] = useState<string>("");
  
  // Ref for the pop sound
  const popAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = () => {
    // Play sound if not muted
    if (!isMuted) {
      if (!popAudioRef.current) {
        // Using a short, pleasant "pop" sound
        popAudioRef.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3');
        popAudioRef.current.volume = 0.5;
      }
      popAudioRef.current.currentTime = 0;
      popAudioRef.current.play().catch(e => console.log("Audio play failed", e));
    }

    // Randomize expression
    const expressions: ('happy' | 'blush' | 'hug')[] = ['happy', 'blush', 'hug'];
    const randomExp = expressions[Math.floor(Math.random() * expressions.length)];
    setExpression(randomExp);

    // Randomize message
    const randomMsg = TEDDY_MESSAGES[Math.floor(Math.random() * TEDDY_MESSAGES.length)];
    setMessage(randomMsg);

    // Reset after delay
    setTimeout(() => {
      setExpression('neutral');
    }, 2000);
  };

  return (
    <section className="py-20 px-4 flex flex-col items-center bg-white/40 backdrop-blur-sm rounded-3xl mx-4 my-8 shadow-xl border border-white/50">
      <h2 className="font-hand text-3xl text-teddy-800 mb-8">Tap Me!</h2>
      
      <div className="relative w-48 md:w-64 h-48 md:h-64 mb-8">
        <TeddyGraphic 
          expression={expression} 
          onClick={handleClick} 
          className="w-full h-full transform transition-transform hover:scale-110 duration-300"
        />
        
        {/* Floating Hearts/Sparkles when clicked */}
        <AnimatePresence>
          {expression !== 'neutral' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-4 -right-4 text-yellow-400"
            >
              <Sparkles size={32} fill="currentColor" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-20 flex items-center justify-center">
        <AnimatePresence mode='wait'>
          {message ? (
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="bg-white px-6 py-4 rounded-2xl shadow-lg border border-love-100 text-teddy-600 font-bold text-center relative"
            >
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-love-100"></div>
              "{message}"
            </motion.div>
          ) : (
             <p className="text-teddy-400 italic text-sm">Waiting for a hug...</p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveSection;