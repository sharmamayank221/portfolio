'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    title: 'Mid-level Software Engineer',
    company: 'Tirios Real Estate Platform',
    location: 'Delaware, Remote',
    period: 'Jul 2023 – Jul 2025',
    achievements: [
      'Pioneered the development of Tirios.ai, a real estate investment platform enabling investors to start investing with as little as $100',
      'Integrated blockchain functionality into the investment platform, enabling secure token purchases and reducing transaction processing time by 20%',
      'Automated blog publishing with Python scripts for Webflow CMS, decreasing publishing time by 60%',
      'Built and maintained the Tirios mobile app using React Native CLI for the token wallet, improving wallet functionality and user experience by 40%',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Webpoint Solutions LLC',
    location: 'Atlanta, GA (Remote)',
    period: 'Jun 2020 – Jun 2023',
    achievements: [
      'Mitigated a DDoS attack for The New York Sun, reducing downtime by 90% and securing system integrity',
      'Migrated the Newstart Lifestyle platform from WordPress to Next.js, enhancing SEO performance and reducing page load time by 35%',
      'Mentored assistant software engineers and conducted knowledge-sharing sessions between PMs, developers, and QAs',
      'Authored technical specifications and developed unit tests with Playwright and Cypress, increasing test coverage and improving system reliability',
    ],
  },
  {
    title: 'Assistant Professor (Python)',
    company: 'HICAST College',
    location: 'Kathmandu, Nepal',
    period: 'May 2019 – Oct 2019',
    achievements: [
      'Developed and delivered a comprehensive Python programming curriculum using VSCode and Git, training 30+ undergraduate students in software development practices',
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" ref={ref} className="py-32 px-6 sm:px-8 lg:px-12 relative bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-16"
        >
          Experience
        </motion.h2>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative pl-8 border-l-2 border-[#2a2a2a] hover:border-[#ffd700]/50 transition-colors"
            >
              <div className="absolute -left-2 top-0 w-4 h-4 bg-[#ffd700] rounded-full" />
              
              <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#2a2a2a] hover:border-[#ffd700]/30 transition-all hover:shadow-lg hover:shadow-[#ffd700]/10">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#ffd700] mb-2">{exp.title}</h3>
                    <div className="flex items-center gap-2 text-[#b0b0b0] mb-2">
                      <Briefcase size={16} />
                      <span className="font-medium">{exp.company}</span>
                      <span className="text-[#666]">•</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#b0b0b0] mt-2 sm:mt-0">
                    <Calendar size={16} />
                    <span>{exp.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mt-6">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#b0b0b0]">
                      <span className="text-[#ffd700] mt-1">▹</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
