import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BackgroundEffects: React.FC = () => {
  const [items, setItems] = useState<{ id: number; left: number; delay: number; scale: number; type: 'heart' | 'star' }[]>([]);

  useEffect(() => {
    // Generate static random values on mount to avoid hydration mismatch
    const generatedItems = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      scale: Math.random() * 0.5 + 0.5,
      type: Math.random() > 0.7 ? 'star' : 'heart' // Mix of hearts and stars
    }));
    setItems(generatedItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute ${item.type === 'heart' ? 'text-love-300' : 'text-yellow-200'} opacity-30`}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.4, 0],
            x: [0, Math.random() * 40 - 20, 0],
            rotate: item.type === 'star' ? [0, 180] : 0
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear",
          }}
          style={{
            left: `${item.left}%`,
            fontSize: `${item.scale * 2}rem`,
          }}
        >
          {item.type === 'heart' ? '❤' : '✨'}
        </motion.div>
      ))}
    </div>
  );
};

export default BackgroundEffects;