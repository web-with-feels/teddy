import React from 'react';
import { motion } from 'framer-motion';

interface TeddyProps {
  expression: 'happy' | 'blush' | 'hug' | 'neutral';
  className?: string;
  onClick?: () => void;
}

const TeddyGraphic: React.FC<TeddyProps> = ({ expression, className, onClick }) => {
  const isHappy = expression === 'happy';
  const isHugging = expression === 'hug';
  const isBlushing = expression === 'blush';

  return (
    <motion.svg
      viewBox="0 0 300 300"
      className={`cursor-pointer drop-shadow-xl ${className}`}
      onClick={onClick}
      initial="idle"
      animate="idle"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <defs>
        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C3B0" /> {/* Warm beige light */}
          <stop offset="100%" stopColor="#C89F8B" /> {/* Warm beige dark */}
        </linearGradient>
        <linearGradient id="snoutGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF5F0" />
          <stop offset="100%" stopColor="#F5E6E0" />
        </linearGradient>
      </defs>

      {/* --- LEGS --- */}
      <motion.g variants={{ idle: { y: [0, 2, 0], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } } }}>
        <ellipse cx="100" cy="240" rx="35" ry="30" fill="url(#bodyGradient)" />
        <ellipse cx="200" cy="240" rx="35" ry="30" fill="url(#bodyGradient)" />
        {/* Paw Pads */}
        <circle cx="100" cy="245" r="12" fill="#F4AFA7" opacity="0.8" />
        <circle cx="200" cy="245" r="12" fill="#F4AFA7" opacity="0.8" />
      </motion.g>

      {/* --- BODY --- */}
      <motion.ellipse
        cx="150" cy="200" rx="75" ry="85"
        fill="url(#bodyGradient)"
        variants={{ idle: { scaleY: [1, 1.02, 1], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } } }}
      />
      {/* Belly Patch */}
      <motion.ellipse
        cx="150" cy="210" rx="45" ry="55"
        fill="#FFF5F0"
        opacity="0.6"
        variants={{ idle: { scaleY: [1, 1.02, 1], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } } }}
      />

      {/* --- HEAD GROUP --- */}
      <motion.g
        variants={{
          idle: { y: [0, 4, 0], rotate: [0, 2, -2, 0], transition: { y: { repeat: Infinity, duration: 2, ease: "easeInOut" }, rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" } } }
        }}
      >
        {/* Ears */}
        <circle cx="75" cy="85" r="35" fill="url(#bodyGradient)" />
        <circle cx="225" cy="85" r="35" fill="url(#bodyGradient)" />
        <circle cx="75" cy="85" r="18" fill="#FFF5F0" opacity="0.7" />
        <circle cx="225" cy="85" r="18" fill="#FFF5F0" opacity="0.7" />

        {/* Face Base */}
        <ellipse cx="150" cy="125" rx="95" ry="85" fill="url(#bodyGradient)" />

        {/* Snout */}
        <ellipse cx="150" cy="145" rx="35" ry="28" fill="url(#snoutGradient)" />
        
        {/* Nose */}
        <path d="M138 138 Q150 132 162 138 Q150 155 138 138 Z" fill="#5E453A" />

        {/* Mouth */}
        <path d="M150 150 L150 158 M140 158 Q150 168 160 158" stroke="#5E453A" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Eyes */}
        <g>
            {isHappy ? (
                // Happy Eyes (^)
                <>
                  <path d="M100 125 Q110 115 120 125" stroke="#3A2A22" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <path d="M180 125 Q190 115 200 125" stroke="#3A2A22" strokeWidth="4" fill="none" strokeLinecap="round" />
                </>
            ) : (
                // Normal Eyes (with blinking)
                <>
                    <motion.ellipse 
                        cx="110" cy="120" rx="8" ry="10" fill="#3A2A22" 
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
                    />
                    <motion.ellipse 
                        cx="190" cy="120" rx="8" ry="10" fill="#3A2A22" 
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
                    />
                    {/* Eye Highlights */}
                    <circle cx="113" cy="116" r="3" fill="white" />
                    <circle cx="193" cy="116" r="3" fill="white" />
                </>
            )}
        </g>

        {/* Blush */}
        <motion.ellipse cx="90" cy="145" rx="15" ry="10" fill="#FDA4AF" animate={{ opacity: isBlushing ? 0.6 : 0 }} />
        <motion.ellipse cx="210" cy="145" rx="15" ry="10" fill="#FDA4AF" animate={{ opacity: isBlushing ? 0.6 : 0 }} />
      </motion.g>

      {/* --- ARMS (Interactive) --- */}
      {/* 
         Fixed: Lowered cy to 195 (was 180) to relax shoulders. 
         Adjusted rotation angles for natural hang.
      */}
      {/* Left Arm */}
      <motion.g
        initial={{ rotate: 0, x: 0, y: 0 }}
        animate={isHugging ? { rotate: -30, x: 15, y: -20 } : { rotate: 0, x: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
         <ellipse cx="70" cy="195" rx="25" ry="50" fill="url(#bodyGradient)" transform="rotate(10 70 195)" />
      </motion.g>

      {/* Right Arm */}
      <motion.g
        initial={{ rotate: 0, x: 0, y: 0 }}
        animate={isHugging ? { rotate: 30, x: -15, y: -20 } : { rotate: 0, x: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
         <ellipse cx="230" cy="195" rx="25" ry="50" fill="url(#bodyGradient)" transform="rotate(-10 230 195)" />
      </motion.g>

      {/* --- EXTRAS --- */}
      {/* Heart appearing on Hug */}
      <motion.path
        d="M150 180 C130 160 110 180 110 200 C110 220 150 250 150 250 C150 250 190 220 190 200 C190 180 170 160 150 180"
        fill="#EF4444"
        initial={{ scale: 0 }}
        animate={{ scale: isHugging ? 1 : 0 }}
        transition={{ type: "spring" }}
      />
      
      {/* Sparkles on Happy */}
      {isHappy && (
          <motion.g
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
          >
             <path d="M250 60 L255 70 L265 75 L255 80 L250 90 L245 80 L235 75 L245 70 Z" fill="#FACC15" />
             <path d="M50 60 L55 70 L65 75 L55 80 L50 90 L45 80 L35 75 L45 70 Z" fill="#FACC15" />
          </motion.g>
      )}

    </motion.svg>
  );
};

export default TeddyGraphic;