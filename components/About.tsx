'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="py-32 px-6 sm:px-8 lg:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            About <span className="text-[#ffd700]">Me</span>
          </motion.h2>
          
          <div className="space-y-6 text-lg sm:text-xl text-[#b0b0b0] leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I'm a <span className="text-[#ffd700] font-medium">Software Engineer</span> building products that matter. 
              I craft full-stack solutions that balance user needs with technical excellence.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              My approach is simple: <span className="text-[#ffd700]">ship fast, iterate smarter</span>. I focus on 
              writing maintainable code, optimizing for performance, and creating experiences that users actually want to use. 
              From startups to enterprise, I've learned that great software comes from understanding both the problem and the people solving it.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Beyond code, I'm pursuing my <span className="text-[#ffd700] font-medium">M.S. in Applied Statistics and Data Science</span> at 
              UT Arlington. The intersection of engineering and data science fascinates me—using data to make better decisions 
              and build more intelligent systems.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-[#808080] italic"
            >
              When I'm not at my desk, you'll find me contributing to open source, experimenting with new frameworks, 
              or sharing what I've learned with the community. Always learning, always building.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <motion.div 
              className="px-6 py-3 bg-[#1a1a1a] rounded-full border border-[#2a2a2a] hover:border-[#ffd700]/50 transition-all cursor-default"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm text-[#b0b0b0]">📍 </span>
              <span className="text-[#ffd700] font-medium">Euless, TX</span>
            </motion.div>
            <motion.div 
              className="px-6 py-3 bg-[#1a1a1a] rounded-full border border-[#2a2a2a] hover:border-[#ffd700]/50 transition-all cursor-default"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm text-[#b0b0b0]">💼 </span>
              <span className="text-[#ffd700] font-medium">Open to Opportunities</span>
            </motion.div>
            <motion.div 
              className="px-6 py-3 bg-[#1a1a1a] rounded-full border border-[#2a2a2a] hover:border-[#ffd700]/50 transition-all cursor-default"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm text-[#b0b0b0]">🎓 </span>
              <span className="text-[#ffd700] font-medium">M.S. Data Science</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
