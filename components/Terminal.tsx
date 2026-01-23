'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Command } from 'lucide-react';

interface TerminalProps {
  onNavigate: (section: string) => void;
}

const commands = [
  { cmd: 'about', description: 'View about section', action: 'about' },
  { cmd: 'experience', description: 'View work experience', action: 'experience' },
  { cmd: 'projects', description: 'View projects', action: 'projects' },
  { cmd: 'skills', description: 'View technical skills', action: 'skills' },
  { cmd: 'contact', description: 'View contact information', action: 'contact' },
  { cmd: 'help', description: 'Show available commands', action: 'help' },
  { cmd: 'clear', description: 'Clear terminal', action: 'clear' },
];

export default function Terminal({ onNavigate }: TerminalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'command' | 'output' | 'error'; content: string }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard shortcut: Cmd/Ctrl + K to open terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (!trimmedCmd) return;

    // Add command to history
    setHistory(prev => [...prev, { type: 'command' as const, content: `$ ${cmd}` }]);

    // Find command
    const command = commands.find(c => c.cmd === trimmedCmd);

    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmedCmd === 'help') {
      setHistory(prev => [
        ...prev,
        { type: 'output' as const, content: 'Available commands:' },
        ...commands.map(c => ({ type: 'output' as const, content: `  ${c.cmd.padEnd(12)} - ${c.description}` })),
      ]);
      return;
    }

    if (command) {
      setHistory(prev => [
        ...prev,
        { type: 'output' as const, content: `Navigating to ${command.action}...` },
      ]);
      setTimeout(() => {
        onNavigate(command.action);
        setIsOpen(false);
      }, 300);
    } else {
      setHistory(prev => [
        ...prev,
        { type: 'error' as const, content: `Command not found: ${cmd}. Type 'help' for available commands.` },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Terminal Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full shadow-lg hover:border-[#ffd700]/50 hover:bg-[#2a2a2a] transition-all group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <TerminalIcon className="w-6 h-6 text-[#ffd700] group-hover:text-[#ffed4e]" />
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Terminal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-6 right-6 z-50 w-full max-w-2xl h-[500px] bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-[#2a2a2a]">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#b0b0b0]">
                    <Command size={14} />
                    <span>Terminal</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-[#2a2a2a] rounded transition-colors"
                >
                  <X size={18} className="text-[#b0b0b0] hover:text-[#ffd700]" />
                </button>
              </div>

              {/* Terminal Content */}
              <div
                ref={terminalRef}
                className="flex-1 p-4 overflow-y-auto font-mono text-sm"
                style={{ scrollbarWidth: 'thin' }}
              >
                <div className="mb-4 text-[#808080]">
                  <div className="mb-2">Welcome to Mayanka's Portfolio Terminal</div>
                  <div className="mb-4">Type 'help' to see available commands</div>
                </div>

                <AnimatePresence>
                  {history.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`mb-2 ${
                        item.type === 'command'
                          ? 'text-[#ffd700]'
                          : item.type === 'error'
                          ? 'text-red-400'
                          : 'text-[#b0b0b0]'
                      }`}
                    >
                      {item.content}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Input Line */}
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-[#ffd700]">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-[#ededed] outline-none caret-[#ffd700]"
                    placeholder="Type a command..."
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
