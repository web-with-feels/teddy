import React, { useState } from 'react';
import { motion } from 'framer-motion';
import canvasConfetti from 'canvas-confetti';
import TeddyGraphic from './TeddyGraphic';
import { FINAL_BUTTON_TEXT, FINAL_MESSAGE } from '../constants';
import { Heart } from 'lucide-react';

const Finale: React.FC = () => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    const duration = 3000;
    const end = Date.now() + duration;

    // Confetti effect
    (function frame() {
      canvasConfetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f43f5e', '#fda4af', '#fff']
      });
      canvasConfetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f43f5e', '#fda4af', '#fff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pb-20 relative text-center">
      
      <div className="w-64 md:w-80 h-64 md:h-80 mb-8 relative">
        <TeddyGraphic 
          expression={accepted ? "hug" : "happy"} 
          className="w-full h-full"
        />
      </div>

      <h2 className="font-hand text-3xl md:text-5xl text-teddy-800 mb-6 max-w-2xl leading-relaxed">
        {FINAL_MESSAGE}
      </h2>

      {!accepted ? (
        <motion.button
          onClick={handleAccept}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-love-500 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-love-300/50 text-xl transition-all hover:bg-love-700 flex items-center gap-2"
        >
          {FINAL_BUTTON_TEXT}
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 px-8 py-4 rounded-full text-love-700 font-bold text-xl shadow-lg"
        >
          Teddy Accepted! Forever Yours. ❤️
        </motion.div>
      )}
    </section>
  );
};

export default Finale;