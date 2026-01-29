import React from 'react';
import { motion } from 'framer-motion';
import { HERO_SUBTITLE, HERO_TITLE } from '../constants';
import TeddyGraphic from './TeddyGraphic';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "backOut" }}
        className="mb-8 w-64 md:w-80 lg:w-96"
      >
        <TeddyGraphic expression="happy" className="w-full h-full" />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="font-hand text-4xl md:text-6xl text-teddy-800 mb-4 drop-shadow-sm"
      >
        {HERO_TITLE} 
        <span className="text-love-500 ml-2">🧸❤️</span>
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-lg md:text-xl text-teddy-600 max-w-md font-medium"
      >
        {HERO_SUBTITLE}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 text-teddy-500"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default HeroSection;