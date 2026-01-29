import React from 'react';
import { motion } from 'framer-motion';
import { REASONS } from '../constants';
import { Star } from 'lucide-react';

const Reasons: React.FC = () => {
  return (
    <section className="py-20 px-4 max-w-3xl mx-auto">
      <h2 className="font-hand text-4xl text-center text-teddy-800 mb-12">Why This Teddy Loves You</h2>
      
      <div className="space-y-6">
        {REASONS.map((reason, index) => (
          <motion.div
            key={reason.id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="flex items-center space-x-4 bg-white/60 p-4 rounded-2xl shadow-sm border border-white"
          >
            <div className="flex-shrink-0 text-yellow-400">
              <Star fill="currentColor" size={24} />
            </div>
            <p className="text-lg text-teddy-700 font-medium">
              {reason.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Reasons;