'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, X, Code, Zap, Users, TrendingUp } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  impact: string[];
  techStack: string[];
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
  category: 'web' | 'extension' | 'algorithm' | 'fullstack';
  gradient: string;
}

const projects: Project[] = [
  {
    name: 'Tascaide',
    description: 'A comprehensive project management platform similar to JIRA, built for teams of all scales.',
    longDescription: 'Tascaide is a full-stack project management solution that helps teams organize, track, and deliver projects efficiently. Built with modern technologies, it offers real-time collaboration, customizable workflows, and powerful analytics.',
    challenge: 'Creating a scalable project management system that could handle complex workflows while maintaining performance and user experience.',
    solution: 'Implemented a microservices architecture with NestJS backend, React.js frontend, and PostgreSQL database. Used WebSockets for real-time updates and optimized database queries for performance.',
    impact: [
      'Supports unlimited projects and team members',
      'Real-time collaboration with instant updates',
      'Customizable workflows and task templates',
      'Advanced analytics and reporting dashboard'
    ],
    techStack: ['NestJS', 'React.js', 'PostgreSQL', 'TypeScript', 'WebSockets', 'Redis', 'Docker'],
    tags: ['Full Stack', 'NestJS', 'React.js', 'PostgreSQL', 'Real-time'],
    github: 'https://github.com/sharmamayank221/tascaide',
    demo: '#',
    featured: true,
    category: 'fullstack',
    gradient: 'from-purple-500/20 to-blue-500/20',
  },
  {
    name: 'GuitarChords',
    description: 'An interactive guitar chord visualization tool with algorithmic chord mapping.',
    longDescription: 'GuitarChords revolutionizes how musicians learn and explore guitar chords. Using advanced algorithms, it maps chord formulas to visual fretboard representations, making music theory accessible and intuitive.',
    challenge: 'Translating complex music theory and chord formulas into an intuitive, interactive graphical interface that works across different guitar tunings and scales.',
    solution: 'Developed a custom algorithm that calculates finger positions based on chord formulas, implemented smooth animations, and created an interactive fretboard with real-time visual feedback.',
    impact: [
      'Supports all major chord types and variations',
      'Works with multiple guitar tunings',
      'Interactive learning mode with audio playback',
      'Export chord charts as images'
    ],
    techStack: ['React.js', 'Canvas API', 'Web Audio API', 'TypeScript', 'Algorithms'],
    tags: ['Algorithm', 'Music', 'UI/UX', 'React.js'],
    github: 'https://github.com/sharmamayank221/guitarchords',
    demo: '#',
    featured: true,
    category: 'algorithm',
    gradient: 'from-orange-500/20 to-red-500/20',
  },
  {
    name: 'Import Ladder',
    description: 'A VS Code extension that automatically organizes and optimizes import statements.',
    longDescription: 'Import Ladder solves the common problem of messy import statements in JavaScript and TypeScript projects. It automatically sorts, groups, and removes unused imports, keeping your codebase clean and maintainable.',
    challenge: 'Creating a reliable parser that understands different import styles, handles edge cases, and integrates seamlessly with VS Code\'s extension API.',
    solution: 'Built a TypeScript-based parser using AST (Abstract Syntax Tree) analysis, implemented configurable sorting rules, and created a fast, non-destructive import organizer.',
    impact: [
      'Used by 500+ developers',
      'Saves 10+ minutes per day on code cleanup',
      'Reduces bundle size by removing unused imports',
      'Maintains consistent code style across teams'
    ],
    techStack: ['TypeScript', 'VS Code API', 'AST Parsing', 'Node.js'],
    tags: ['VS Code Extension', 'TypeScript', 'Developer Tools'],
    github: 'https://github.com/sharmamayank221/import-ladder',
    demo: 'https://marketplace.visualstudio.com/items?itemName=sharmamayank221.import-ladder',
    featured: true,
    category: 'extension',
    gradient: 'from-green-500/20 to-teal-500/20',
  },
  {
    name: 'Portfolio Website',
    description: 'This very portfolio - a modern, performant showcase built with Next.js.',
    longDescription: 'A cutting-edge portfolio website showcasing modern web development practices, featuring smooth animations, responsive design, and optimized performance.',
    challenge: 'Creating a visually stunning portfolio that loads fast, works perfectly on all devices, and effectively showcases skills and projects.',
    solution: 'Built with Next.js 14 for optimal performance, Framer Motion for smooth animations, and Tailwind CSS for rapid styling. Implemented lazy loading, code splitting, and SEO optimization.',
    impact: [
      '100% Lighthouse performance score',
      'Fully responsive across all devices',
      'Smooth 60fps animations',
      'SEO optimized for better discoverability'
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    tags: ['Next.js', 'Portfolio', 'TypeScript', 'Design'],
    github: 'https://github.com/sharmamayank221/portfolio',
    demo: '#',
    featured: false,
    category: 'web',
    gradient: 'from-yellow-500/20 to-amber-500/20',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | Project['category']>('all');

  const featuredProjects = projects.filter(p => p.featured);
  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  const categories: Array<{ value: 'all' | Project['category']; label: string }> = [
    { value: 'all', label: 'All Projects' },
    { value: 'fullstack', label: 'Full Stack' },
    { value: 'web', label: 'Web Apps' },
    { value: 'extension', label: 'Extensions' },
    { value: 'algorithm', label: 'Algorithms' },
  ];

  return (
    <section id="projects" ref={ref} className="py-32 px-6 sm:px-8 lg:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
        >
          Featured <span className="text-[#ffd700]">Projects</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-[#b0b0b0] mb-8 max-w-3xl"
        >
          A collection of projects showcasing my skills in full-stack development, 
          problem-solving, and creating impactful solutions. Each project tells a story of challenges overcome and value delivered.
        </motion.p>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat.value
                  ? 'bg-[#ffd700] text-[#0a0a0a]'
                  : 'bg-[#1a1a1a] text-[#b0b0b0] border border-[#2a2a2a] hover:border-[#ffd700]/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Featured Projects - Large Cards */}
        <div className="space-y-12 mb-16">
          {featuredProjects
            .filter(p => filter === 'all' || p.category === filter)
            .map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl hover:border-[#ffd700]/50 transition-all cursor-pointer"
              onClick={() => setSelectedProject(project)}
              whileHover={{ y: -5 }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Project Image Placeholder */}
                  <div className="relative h-64 lg:h-80 rounded-lg bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-[#2a2a2a] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Code size={64} className="text-[#3a3a3a]" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="h-2 bg-[#0a0a0a]/50 rounded-full" />
                      <div className="h-2 bg-[#0a0a0a]/30 rounded-full mt-2 w-3/4" />
                      <div className="h-2 bg-[#0a0a0a]/20 rounded-full mt-2 w-1/2" />
                    </div>
                  </div>

                  {/* Project Info */}
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-[#ffd700] mb-2 group-hover:text-[#ffed4e] transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-[#b0b0b0] text-lg mb-6 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {project.impact.slice(0, 2).map((impact, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Zap size={16} className="text-[#ffd700] mt-1 flex-shrink-0" />
                          <span className="text-sm text-[#b0b0b0]">{impact}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs bg-[#0a0a0a] text-[#ffd700] rounded-full border border-[#2a2a2a]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-3 py-1 text-xs text-[#b0b0b0]">
                          +{project.techStack.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg hover:border-[#ffd700]/50 hover:text-[#ffd700] transition-all text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </motion.a>
                      {project.demo !== '#' && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 px-4 py-2 bg-[#ffd700] text-[#0a0a0a] rounded-lg hover:bg-[#ffed4e] transition-all text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink size={16} />
                          <span>Live Demo</span>
                        </motion.a>
                      )}
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="px-4 py-2 text-sm text-[#b0b0b0] hover:text-[#ffd700] transition-colors"
                      >
                        Learn More →
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects Grid */}
        {filteredProjects.filter(p => !p.featured).length > 0 && (
          <>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl font-bold mb-8"
            >
              Other Projects
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects
                .filter(p => !p.featured)
                .map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="group bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#ffd700]/50 transition-all cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#ffd700] group-hover:text-[#ffed4e] transition-colors">
                      {project.name}
                    </h3>
                    <div className="flex gap-2">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#b0b0b0] hover:text-[#ffd700] transition-colors"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github size={18} />
                      </motion.a>
                      {project.demo !== '#' && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#b0b0b0] hover:text-[#ffd700] transition-colors"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink size={18} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-[#b0b0b0] mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-[#0a0a0a] text-[#ffd700] rounded-full border border-[#2a2a2a]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 text-[#b0b0b0] hover:text-[#ffd700] transition-colors"
              >
                <X size={24} />
              </button>

              <div className={`h-2 bg-gradient-to-r ${selectedProject.gradient} rounded-full mb-8`} />

              <h2 className="text-4xl font-bold text-[#ffd700] mb-4">{selectedProject.name}</h2>
              <p className="text-xl text-[#b0b0b0] mb-8">{selectedProject.longDescription}</p>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-lg font-bold text-[#ffd700] mb-2 flex items-center gap-2">
                    <Code size={20} />
                    Challenge
                  </h3>
                  <p className="text-[#b0b0b0]">{selectedProject.challenge}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#ffd700] mb-2 flex items-center gap-2">
                    <Zap size={20} />
                    Solution
                  </h3>
                  <p className="text-[#b0b0b0]">{selectedProject.solution}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#ffd700] mb-2 flex items-center gap-2">
                    <TrendingUp size={20} />
                    Impact
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.impact.map((impact, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#b0b0b0]">
                        <span className="text-[#ffd700] mt-1">▹</span>
                        <span>{impact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#ffd700] mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-[#0a0a0a] text-[#ffd700] rounded-lg border border-[#2a2a2a]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-[#2a2a2a]">
                <motion.a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg hover:border-[#ffd700]/50 hover:text-[#ffd700] transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} />
                  <span>View Code</span>
                </motion.a>
                {selectedProject.demo !== '#' && (
                  <motion.a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-[#ffd700] text-[#0a0a0a] rounded-lg hover:bg-[#ffed4e] transition-all font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={20} />
                    <span>Live Demo</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
