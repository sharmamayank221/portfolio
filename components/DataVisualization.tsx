'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Code, Database, Cloud, Brain, X } from 'lucide-react';

interface DataVisualizationProps {
  onClose: () => void;
}

const skillData = {
  'Frontend': 90,
  'Backend': 85,
  'Full Stack': 88,
  'AI/ML': 75,
  'DevOps': 70,
};

const experienceData = [
  { year: '2019', role: 'Assistant Professor', company: 'HICAST' },
  { year: '2020', role: 'Software Engineer', company: 'Webpoint Solutions' },
  { year: '2023', role: 'Mid-level Engineer', company: 'Tirios' },
];

export default function DataVisualization({ onClose }: DataVisualizationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="relative max-w-4xl w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-8 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#b0b0b0] hover:text-[#ffd700] transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-[#ffd700] mb-8">📊 Data Visualizations</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skills Radar */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#ffd700] mb-6 flex items-center gap-2">
              <Code size={20} />
              Skills Breakdown
            </h3>
            <div className="space-y-4">
              {Object.entries(skillData).map(([skill, value], index) => (
                <div key={skill}>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#ededed]">{skill}</span>
                    <span className="text-[#ffd700]">{value}%</span>
                  </div>
                  <div className="h-3 bg-[#0a0a0a] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-[#ffd700] to-[#ffed4e] rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#ffd700] mb-6 flex items-center gap-2">
              <TrendingUp size={20} />
              Career Timeline
            </h3>
            <div className="space-y-6">
              {experienceData.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative pl-8 border-l-2 border-[#ffd700]/30"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-[#ffd700] rounded-full" />
                  <div className="text-[#ffd700] font-bold">{exp.year}</div>
                  <div className="text-[#ededed] font-medium">{exp.role}</div>
                  <div className="text-[#808080] text-sm">{exp.company}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tech Stack Categories */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#ffd700] mb-6 flex items-center gap-2">
              <Database size={20} />
              Tech Stack
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Code, label: 'Languages', count: 6 },
                { icon: Cloud, label: 'Cloud', count: 3 },
                { icon: Brain, label: 'AI/ML', count: 7 },
                { icon: TrendingUp, label: 'Tools', count: 8 },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] hover:border-[#ffd700]/50 transition-colors"
                >
                  <item.icon className="w-8 h-8 text-[#ffd700] mx-auto mb-2" />
                  <div className="text-[#ededed] font-medium">{item.label}</div>
                  <div className="text-[#808080] text-sm">{item.count} technologies</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-gradient-to-br from-[#ffd700]/10 to-[#ffed4e]/5 border border-[#ffd700]/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#ffd700] mb-6">Key Metrics</h3>
            <div className="space-y-4">
              {[
                { label: 'Years Experience', value: '5+' },
                { label: 'Projects', value: '10+' },
                { label: 'Technologies', value: '25+' },
                { label: 'Education', value: 'M.S. Data Science' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center p-3 bg-[#0a0a0a]/50 rounded-lg"
                >
                  <span className="text-[#b0b0b0]">{stat.label}</span>
                  <span className="text-[#ffd700] font-bold">{stat.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
