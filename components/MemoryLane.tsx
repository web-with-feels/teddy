import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MEMORIES } from '../constants';

const MemoryLane: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  return (
    <section className="py-20 bg-white/50 backdrop-blur-md overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-8 text-center">
        <h2 className="font-hand text-4xl text-teddy-800">Memory Lane</h2>
        <p className="text-teddy-500 mt-2">Every memory with you is stitched into my heart.</p>
      </div>

      <div className="relative">
        {/* Scroll Container */}
        <div 
          ref={containerRef}
          className="flex overflow-x-auto gap-8 px-8 py-8 no-scrollbar snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {MEMORIES.map((memory) => (
            <div 
              key={memory.id} 
              className="flex-shrink-0 w-72 md:w-80 snap-center bg-white p-4 rounded-3xl shadow-xl transform transition-transform hover:-rotate-1 duration-300"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                <img 
                  src={memory.url} 
                  alt="Memory" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="font-hand text-lg text-center text-teddy-600 leading-tight">
                {memory.caption}
              </p>
            </div>
          ))}
          {/* Padding for end of scroll */}
          <div className="w-8 flex-shrink-0"></div>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-gray-200 rounded-full mx-auto mt-4 overflow-hidden">
           <motion.div 
             className="h-full bg-love-300"
             style={{ scaleX: scrollXProgress, transformOrigin: "0%" }}
           />
        </div>
      </div>
    </section>
  );
};

export default MemoryLane;