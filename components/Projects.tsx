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
  demoMedia?: string; // Path to video/gif file
}

const projects: Project[] = [
  {
    name: 'Chords of Guitar',
    description: 'An interactive guitar chord learning platform with comprehensive chord libraries and visualizations.',
    longDescription: 'Chords of Guitar is a comprehensive web platform designed to help guitarists of all levels learn and master guitar chords. The platform features an extensive chord library, interactive chord diagrams, and intuitive navigation to make learning accessible and enjoyable.',
    challenge: 'Creating an intuitive platform that makes learning guitar chords accessible to beginners while providing advanced features for experienced players, all while maintaining fast load times and smooth user experience.',
    solution: 'Built a modern full-stack application with Next.js for optimal performance, implemented interactive chord visualizations, and created a user-friendly interface with responsive design. Optimized for SEO to help musicians discover the platform.',
    impact: [
      'Comprehensive chord library covering all major chord types',
      'Interactive chord diagrams for visual learning',
      'Fully responsive design for all devices',
      'Fast load times and optimized performance'
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React.js'],
    tags: ['Full Stack', 'Next.js', 'Music', 'TypeScript'],
    github: '#',
    demo: 'https://chordsofguitar.com',
    featured: true,
    category: 'fullstack',
    gradient: 'from-blue-500/20 to-indigo-500/20',
    demoMedia: '/assets/chordsofguitar-demo.gif',
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
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center"
        >
          Featured <span className="text-[#ffd700]">Project</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-[#b0b0b0] mb-12 max-w-3xl mx-auto text-center"
        >
          A full-stack project showcasing my skills in modern web development, 
          problem-solving, and creating impactful solutions.
        </motion.p>

        {/* Featured Project - Large Card */}
        <div className="max-w-5xl mx-auto">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl hover:border-[#ffd700]/50 transition-all cursor-pointer"
              onClick={() => setSelectedProject(project)}
              whileHover={{ y: -5 }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Project Image/Video */}
                  <div className="relative h-64 lg:h-80 rounded-lg bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-[#2a2a2a] overflow-hidden">
                    {project.demoMedia ? (
                      project.demoMedia.endsWith('.gif') || project.demoMedia.endsWith('.webp') || project.demoMedia.endsWith('.png') || project.demoMedia.endsWith('.jpg') || project.demoMedia.endsWith('.jpeg') ? (
                        <img 
                          src={project.demoMedia} 
                          alt={`${project.name} demo`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            console.error('Failed to load image:', project.demoMedia);
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <video 
                          src={project.demoMedia} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className="w-full h-full object-contain"
                        >
                          Your browser does not support the video tag.
                        </video>
                      )
                    ) : (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Code size={64} className="text-[#3a3a3a]" />
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="h-2 bg-[#0a0a0a]/50 rounded-full" />
                          <div className="h-2 bg-[#0a0a0a]/30 rounded-full mt-2 w-3/4" />
                          <div className="h-2 bg-[#0a0a0a]/20 rounded-full mt-2 w-1/2" />
                        </div>
                      </>
                    )}
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
