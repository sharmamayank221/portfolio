'use client';

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 sm:px-8 lg:px-12 border-t border-[#1a1a1a] bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#b0b0b0] text-sm">
            © {new Date().getFullYear()} Mayanka Sharma. All rights reserved.
          </p>
          
          <motion.button
            onClick={scrollToTop}
            className="p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:border-[#ffd700]/50 hover:text-[#ffd700] transition-all"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
