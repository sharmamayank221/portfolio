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
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
            About <span className="text-[#ffd700]">Me</span>
          </h2>
          
          <div className="space-y-6 text-lg sm:text-xl text-[#b0b0b0] leading-relaxed">
            <p>
              I'm a <span className="text-[#ffd700] font-medium">Mid-level Software Engineer</span> with a passion for building 
              innovative web applications and scalable solutions. Currently working at Tirios Real Estate Platform, 
              I specialize in full-stack development using modern technologies like React, Next.js, and Node.js.
            </p>
            
            <p>
              With experience spanning from startup environments to enterprise-level applications, I've developed 
              expertise in creating seamless user experiences, optimizing performance, and implementing robust 
              solutions that drive business value.
            </p>
            
            <p>
              I'm currently pursuing my <span className="text-[#ffd700] font-medium">M.S. in Applied Statistics and Data Science</span> at 
              the University of Texas at Arlington, combining my engineering background with advanced data science 
              skills to solve complex problems.
            </p>
            
            <p>
              When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, 
              and sharing knowledge with the developer community.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <div className="px-6 py-3 bg-[#1a1a1a] rounded-full border border-[#2a2a2a]">
              <span className="text-sm text-[#b0b0b0]">Location: </span>
              <span className="text-[#ffd700] font-medium">Euless, TX</span>
            </div>
            <div className="px-6 py-3 bg-[#1a1a1a] rounded-full border border-[#2a2a2a]">
              <span className="text-sm text-[#b0b0b0]">Available: </span>
              <span className="text-[#ffd700] font-medium">Open to Opportunities</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
