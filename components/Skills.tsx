'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'C', 'R', 'SAS'],
  },
  {
    title: 'Frameworks & Technologies',
    skills: [
      'React.js',
      'Next.js',
      'NestJS',
      'Node.js',
      'REST APIs',
      'GraphQL',
      'React Native',
      'Flask',
      'Cypress',
      'Playwright',
      'Storybook',
      'Tableau',
    ],
  },
  {
    title: 'Databases',
    skills: ['MongoDB', 'SQL', 'PostgreSQL'],
  },
  {
    title: 'Cloud & DevOps',
    skills: ['Docker', 'AWS', 'Kubernetes'],
  },
  {
    title: 'AI/ML',
    skills: ['Pandas', 'NumPy', 'scikit-learn', 'LLMs', 'Machine Learning'],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" ref={ref} className="py-32 px-6 sm:px-8 lg:px-12 relative bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
        >
          Technical <span className="text-[#ffd700]">Skills</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-[#b0b0b0] mb-16 max-w-3xl"
        >
          A comprehensive toolkit for building modern, scalable applications across the full stack.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#ffd700]/50 transition-all"
            >
              <h3 className="text-xl font-bold text-[#ffd700] mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                    className="px-4 py-2 bg-[#0a0a0a] text-[#ededed] rounded-lg border border-[#2a2a2a] hover:border-[#ffd700]/50 hover:text-[#ffd700] transition-all text-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
