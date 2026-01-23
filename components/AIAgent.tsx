'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, TrendingUp, Code, BarChart3, Brain } from 'lucide-react';
import DataVisualization from './DataVisualization';

interface AIAgentProps {
  onNavigate: (section: string) => void;
}

const agentResponses: Record<string, string> = {
  'about': 'I can show you Mayanka\'s background. He\'s a Software Engineer building products that matter, currently pursuing M.S. in Data Science at UT Arlington.',
  'experience': 'Mayanka has 5+ years of experience. Currently at Tirios Real Estate Platform, previously at Webpoint Solutions. Want to see the details?',
  'projects': 'Check out Chords of Guitar - a full-stack interactive guitar learning platform! It\'s his featured project.',
  'skills': 'Mayanka works with React, Next.js, TypeScript, Python, and AI tools like Cursor and GitHub Copilot. Want to see the full tech stack?',
  'contact': 'You can reach Mayanka via email or LinkedIn. I can help you navigate there!',
  'default': 'I\'m an AI agent here to help you explore Mayanka\'s portfolio. Try asking about: experience, projects, skills, or say "show data" to see visualizations!',
};

const quickActions = [
  { icon: TrendingUp, label: 'Experience', action: 'experience', color: 'from-blue-500 to-cyan-500' },
  { icon: Code, label: 'Projects', action: 'projects', color: 'from-purple-500 to-pink-500' },
  { icon: BarChart3, label: 'Skills', action: 'skills', color: 'from-green-500 to-emerald-500' },
  { icon: Brain, label: 'About', action: 'about', color: 'from-orange-500 to-red-500' },
];

export default function AIAgent({ onNavigate }: AIAgentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDataViz, setShowDataViz] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'agent'; content: string; timestamp: Date }>>([
    { type: 'agent', content: '👋 Hi! I\'m your AI assistant. I can help you explore this portfolio, show data visualizations, or answer questions. What would you like to know?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Keyboard shortcut: Cmd/Ctrl + J to open agent
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const processMessage = async (userInput: string) => {
    const lowerInput = userInput.toLowerCase().trim();
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: userInput, timestamp: new Date() }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 800));

    let response = '';
    let shouldNavigate = false;
    let navigateTo = '';

    if (lowerInput.includes('experience') || lowerInput.includes('work') || lowerInput.includes('job')) {
      response = agentResponses['experience'];
      shouldNavigate = true;
      navigateTo = 'experience';
    } else if (lowerInput.includes('project') || lowerInput.includes('build') || lowerInput.includes('chords')) {
      response = agentResponses['projects'];
      shouldNavigate = true;
      navigateTo = 'projects';
    } else if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('stack')) {
      response = agentResponses['skills'];
      shouldNavigate = true;
      navigateTo = 'skills';
    } else if (lowerInput.includes('about') || lowerInput.includes('who') || lowerInput.includes('background')) {
      response = agentResponses['about'];
      shouldNavigate = true;
      navigateTo = 'about';
    } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach')) {
      response = agentResponses['contact'];
      shouldNavigate = true;
      navigateTo = 'contact';
    } else if (lowerInput.includes('data') || lowerInput.includes('visualization') || lowerInput.includes('chart') || lowerInput.includes('show')) {
      response = '📊 Opening data visualizations...';
      setTimeout(() => {
        setShowDataViz(true);
      }, 500);
    } else if (lowerInput.includes('help') || lowerInput.includes('what can')) {
      response = 'I can help you:\n• Navigate to different sections\n• Show data visualizations\n• Answer questions about the portfolio\n• Provide insights about skills and experience\n\nTry asking about experience, projects, skills, or say "show data"!';
    } else {
      response = agentResponses['default'];
    }

    setMessages(prev => [...prev, { type: 'agent', content: response, timestamp: new Date() }]);
    setIsTyping(false);

    if (shouldNavigate) {
      setTimeout(() => {
        onNavigate(navigateTo);
        setIsOpen(false);
      }, 1000);
    }
  };

  const handleQuickAction = (action: string) => {
    onNavigate(action);
    setIsOpen(false);
  };

  return (
    <>
      {/* AI Agent Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-br from-[#ffd700]/20 to-[#ffed4e]/10 border border-[#ffd700]/30 rounded-full shadow-lg hover:border-[#ffd700]/50 hover:bg-gradient-to-br hover:from-[#ffd700]/30 hover:to-[#ffed4e]/20 transition-all group backdrop-blur-sm"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Bot className="w-6 h-6 text-[#ffd700] group-hover:text-[#ffed4e]" />
        </motion.div>
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0a0a0a]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* AI Agent Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Agent Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-6 right-6 z-50 w-full max-w-md h-[600px] bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border-b border-[#2a2a2a]">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Bot className="w-6 h-6 text-[#ffd700]" />
                  </motion.div>
                  <div>
                    <h3 className="text-sm font-bold text-[#ffd700]">AI Assistant</h3>
                    <p className="text-xs text-[#808080]">Powered by AI • Press Cmd+J</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
                >
                  <X size={18} className="text-[#b0b0b0] hover:text-[#ffd700]" />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="px-6 py-3 bg-[#0f0f0f] border-b border-[#2a2a2a]">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleQuickAction(action.action)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${action.color} text-white text-xs font-medium whitespace-nowrap`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <action.icon size={14} />
                      <span>{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4" ref={messagesEndRef}>
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'agent' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffd700] to-[#ffed4e] flex items-center justify-center flex-shrink-0">
                          <Bot size={16} className="text-[#0a0a0a]" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-[#ffd700] to-[#ffed4e] text-[#0a0a0a]'
                            : 'bg-[#1a1a1a] border border-[#2a2a2a] text-[#ededed]'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                      </div>
                      {message.type === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-[#ffd700]">MS</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2 items-center"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffd700] to-[#ffed4e] flex items-center justify-center">
                      <Bot size={16} className="text-[#0a0a0a]" />
                    </div>
                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-[#ffd700] rounded-full"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-[#2a2a2a] bg-[#0f0f0f]">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && input.trim()) {
                        processMessage(input);
                      }
                    }}
                    placeholder="Ask me anything..."
                    className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#ededed] placeholder-[#666] focus:outline-none focus:border-[#ffd700]/50 transition-colors"
                  />
                  <motion.button
                    onClick={() => input.trim() && processMessage(input)}
                    disabled={!input.trim()}
                    className="p-3 bg-gradient-to-r from-[#ffd700] to-[#ffed4e] rounded-lg text-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={20} />
                  </motion.button>
                </div>
                <p className="text-xs text-[#666] mt-2 text-center">
                  Try: "show experience" • "tell me about projects" • "what skills?"
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Data Visualization Modal */}
      {showDataViz && <DataVisualization onClose={() => setShowDataViz(false)} />}
    </>
  );
}
