import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOVE_NOTES } from '../constants';
import { Heart } from 'lucide-react';

const LoveNotes: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="font-hand text-4xl text-center text-teddy-800 mb-12">Notes from my Heart</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {LOVE_NOTES.map((note) => (
          <motion.div
            key={note.id}
            layoutId={`card-${note.id}`}
            onClick={() => setSelectedId(note.id)}
            className="cursor-pointer bg-white rounded-3xl p-6 shadow-lg shadow-pink-100 border-2 border-pink-50 hover:border-pink-200 transition-colors relative overflow-hidden group"
            whileHover={{ y: -5 }}
          >
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Heart size={64} />
             </div>
             
             <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-love-500 mb-4">
               <Heart size={20} fill="currentColor" />
             </div>
             
             <h3 className="font-bold text-xl text-teddy-800 mb-2">{note.title}</h3>
             <p className="text-teddy-400 text-sm">Tap to read...</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/20 backdrop-blur-sm">
             <motion.div
               layoutId={`card-${selectedId}`}
               className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl relative"
             >
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                  className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200"
                >
                  ✕
                </button>

                {(() => {
                  const note = LOVE_NOTES.find(n => n.id === selectedId);
                  if (!note) return null;
                  return (
                    <div className="flex flex-col items-center text-center">
                       <div className="w-16 h-16 bg-love-100 rounded-full flex items-center justify-center text-love-500 mb-6">
                         <Heart size={32} fill="currentColor" />
                       </div>
                       <h3 className="font-hand text-3xl text-teddy-800 mb-4">{note.title}</h3>
                       <p className="text-teddy-600 leading-relaxed text-lg">
                         {note.message}
                       </p>
                    </div>
                  );
                })()}
             </motion.div>
             {/* Backdrop click handler */}
             <div className="absolute inset-0 -z-10" onClick={() => setSelectedId(null)}></div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LoveNotes;