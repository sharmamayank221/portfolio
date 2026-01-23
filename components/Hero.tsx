'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ffd700]/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ffd700]/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 lg:gap-16">
          {/* Profile Photo - Left */}
          <motion.div
            variants={itemVariants}
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffd700]/20 to-[#ffed4e]/20 rounded-full blur-2xl animate-pulse" />
              <img
                src="/assets/profile-photo.png"
                alt="Mayanka Sharma"
                className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full object-cover border-4 border-[#ffd700]/30 shadow-2xl"
                onError={(e) => {
                  // Hide image if it fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </motion.div>

          {/* Text Content - Right */}
          <div className="flex-1 text-center md:text-left">
            <motion.div variants={itemVariants}>
              <motion.p
                className="text-[#ffd700] text-sm sm:text-base font-medium mb-4 md:mb-6 tracking-wider uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Software Engineer
              </motion.p>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight"
            >
          <motion.span 
            className="block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Mayanka
          </motion.span>
          <motion.span 
            className="block text-[#ffd700] bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#ffed4e] to-[#ffd700] bg-[length:200%_auto]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ 
              delay: 0.9, 
              duration: 0.6,
              backgroundPosition: {
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }
            }}
          >
            Sharma
          </motion.span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-[#b0b0b0] max-w-3xl mb-12 leading-relaxed"
            >
          <motion.p 
            className="mb-4 text-xl sm:text-2xl md:text-3xl font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            Crafting digital experiences that{' '}
            <motion.span 
              className="text-[#ffd700] relative inline-block"
              whileHover={{ scale: 1.05 }}
            >
              users love
            </motion.span>
            {' '}and{' '}
            <motion.span 
              className="text-[#ffd700] relative inline-block"
              whileHover={{ scale: 1.05 }}
            >
              businesses trust
            </motion.span>
            .
          </motion.p>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-[#808080] max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            Full-stack engineer specializing in modern web technologies, focused on performance, accessibility, and developer experience.
          </motion.p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-16"
            >
          <motion.a
            href="https://github.com/sharmamayank221"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-full transition-colors border border-[#2a2a2a] hover:border-[#ffd700]/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            <span>GitHub</span>
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/sharmamayanka"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-full transition-colors border border-[#2a2a2a] hover:border-[#ffd700]/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </motion.a>
          <motion.a
            href="mailto:sharmamayank221@gmail.com"
            className="flex items-center gap-2 px-6 py-3 bg-[#ffd700] text-[#0a0a0a] hover:bg-[#ffed4e] rounded-full transition-colors font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={20} />
            <span>Get in Touch</span>
          </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
