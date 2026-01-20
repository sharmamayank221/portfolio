'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, Star, GitBranch, ExternalLink } from 'lucide-react';

const contributions = [
  {
    repo: 'react',
    organization: 'facebook',
    description: 'Contributing to React core library improvements and bug fixes',
    stars: '230k+',
    type: 'Core Library',
  },
  {
    repo: 'next.js',
    organization: 'vercel',
    description: 'Documentation improvements and feature suggestions',
    stars: '120k+',
    type: 'Framework',
  },
  {
    repo: 'typescript',
    organization: 'microsoft',
    description: 'Type definitions and compiler enhancements',
    stars: '100k+',
    type: 'Language',
  },
];

const personalRepos = [
  {
    name: 'portfolio',
    description: 'This portfolio website - open source and available for others to learn from',
    stars: 12,
    language: 'TypeScript',
    url: 'https://github.com/sharmamayank221/portfolio',
  },
  {
    name: 'guitarchords',
    description: 'Open source guitar chord visualization tool',
    stars: 8,
    language: 'JavaScript',
    url: 'https://github.com/sharmamayank221/guitarchords',
  },
  {
    name: 'import-ladder',
    description: 'VS Code extension for organizing imports',
    stars: 15,
    language: 'TypeScript',
    url: 'https://github.com/sharmamayank221/import-ladder',
  },
];

export default function OpenSource() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 px-6 sm:px-8 lg:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
        >
          Open Source <span className="text-[#ffd700]">Contributions</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-[#b0b0b0] mb-16 max-w-3xl"
        >
          Contributing to the open source community and sharing knowledge through code.
        </motion.p>

        {/* Personal Repositories */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-[#ffd700]">My Open Source Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalRepos.map((repo, index) => (
              <motion.a
                key={index}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:border-[#ffd700]/50 transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Github size={20} className="text-[#ffd700]" />
                    <h4 className="font-bold text-[#ededed] group-hover:text-[#ffd700] transition-colors">
                      {repo.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 text-[#b0b0b0] text-sm">
                    <Star size={14} />
                    <span>{repo.stars}</span>
                  </div>
                </div>
                <p className="text-[#b0b0b0] text-sm mb-4 leading-relaxed">{repo.description}</p>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 text-xs bg-[#0a0a0a] text-[#ffd700] rounded border border-[#2a2a2a]">
                    {repo.language}
                  </span>
                  <ExternalLink size={16} className="text-[#b0b0b0] group-hover:text-[#ffd700] transition-colors" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Contributions to Major Projects */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-[#ffd700]">Contributions to Major Projects</h3>
          <div className="space-y-4">
            {contributions.map((contribution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="p-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:border-[#ffd700]/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl font-bold text-[#ededed]">
                        {contribution.organization}/{contribution.repo}
                      </h4>
                      <span className="px-2 py-1 text-xs bg-[#0a0a0a] text-[#ffd700] rounded border border-[#2a2a2a]">
                        {contribution.type}
                      </span>
                    </div>
                    <p className="text-[#b0b0b0] mb-3">{contribution.description}</p>
                    <div className="flex items-center gap-4 text-sm text-[#b0b0b0]">
                      <div className="flex items-center gap-1">
                        <Star size={14} />
                        <span>{contribution.stars} stars</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitBranch size={14} />
                        <span>Active contributor</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={`https://github.com/${contribution.organization}/${contribution.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 p-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg hover:border-[#ffd700]/50 hover:text-[#ffd700] transition-all"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://github.com/sharmamayank221"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#ffd700] text-[#0a0a0a] font-medium rounded-lg hover:bg-[#ffed4e] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            <span>View All on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
