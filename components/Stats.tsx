'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Users, TrendingUp, Zap } from 'lucide-react';

const stats = [
  {
    icon: Code,
    value: '5+',
    label: 'Years of Experience',
    description: 'Building scalable applications',
  },
  {
    icon: Users,
    value: '30+',
    label: 'Students Taught',
    description: 'Python programming & best practices',
  },
  {
    icon: TrendingUp,
    value: '20%',
    label: 'Performance Improvement',
    description: 'Average optimization achieved',
  },
  {
    icon: Zap,
    value: '60%',
    label: 'Time Saved',
    description: 'Through automation & efficiency',
  },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 px-6 sm:px-8 lg:px-12 relative bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center"
        >
          Impact by <span className="text-[#ffd700]">Numbers</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-[#b0b0b0] mb-16 text-center max-w-3xl mx-auto"
        >
          Quantifying the value I've delivered through my work and contributions.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:border-[#ffd700]/50 transition-all group"
                whileHover={{ y: -5 }}
              >
                <div className="inline-flex p-4 bg-[#0a0a0a] rounded-lg mb-4 group-hover:bg-[#ffd700] group-hover:text-[#0a0a0a] transition-colors">
                  <Icon size={32} className="text-[#ffd700] group-hover:text-[#0a0a0a]" />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1, type: 'spring' }}
                  className="text-5xl font-bold text-[#ffd700] mb-2"
                >
                  {stat.value}
                </motion.div>
                <h3 className="text-lg font-semibold text-[#ededed] mb-2">{stat.label}</h3>
                <p className="text-sm text-[#b0b0b0]">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
