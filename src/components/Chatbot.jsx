// src/components/Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';

const TypewriterText = ({ text, speed = 18 }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    if (!text) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return <span>{displayed}</span>;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "You're now interrogating Nigus's AI twin. Ask anything about his systems, decisions, or trade-offs.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('openChat', handleOpenChat);
    return () => window.removeEventListener('openChat', handleOpenChat);
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', text: data.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'I could not reach the backend. Make sure the AI server is online, then ask again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (q) => {
    setInput(q);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-slate-900 text-white shadow-[0_0_30px_rgba(15,23,42,0.7)] ring-2 ring-blue-500/60 hover:shadow-[0_0_40px_rgba(59,130,246,0.9)] hover:scale-110 transition-all duration-300 z-40 glass-dark ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            className="fixed bottom-4 right-4 w-[92vw] sm:w-[360px] md:w-[400px] h-[520px] sm:h-[580px] rounded-[1.75rem] overflow-hidden glass bg-slate-950/90 text-slate-50 border border-slate-800/80 shadow-[0_24px_80px_rgba(0,0,0,0.7)] flex flex-col z-40 font-mono text-[11px]"
          >
            {/* Terminal header */}
            <div className="px-4 py-3 flex items-center justify-between bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
                </div>
                <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  n.ai // interrogation
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-800/80 text-slate-400 hover:text-slate-100 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Prompt line */}
            <div className="px-4 py-2 border-b border-slate-800/80 text-[10px] text-emerald-400 flex items-center gap-2 bg-slate-950/95">
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI&gt; Initiated. Ask targeted questions about Nigus&apos;s stack, decisions, or career.</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-slate-950/95">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-start gap-2 max-w-[90%]">
                    {msg.role === 'assistant' && (
                      <div className="mt-1">
                        <Sparkles className="w-3 h-3 text-blue-400" />
                      </div>
                    )}
                    <div
                      className={`px-3 py-2 rounded-xl border text-[11px] leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-slate-800/80 border-slate-700 text-slate-50'
                          : 'bg-slate-950/80 border-slate-800 text-slate-200'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <TypewriterText key={index} text={msg.text} />
                      ) : (
                        <span>{msg.text}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce delay-150" />
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce delay-300" />
                  <span>AI is composing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested prompts */}
            {messages.length === 1 && (
              <div className="px-4 py-3 border-t border-slate-800/80 bg-slate-950">
                <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-slate-500">
                  Suggested interrogations
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleQuickQuestion('Why should we hire him as a Senior AI Engineer?')}
                    className="px-3 py-1.5 rounded-full bg-slate-900 text-[10px] text-slate-200 hover:bg-slate-800 transition-colors"
                  >
                    Why hire him?
                  </button>
                  <button
                    onClick={() => handleQuickQuestion('Explain his most complex production system.')}
                    className="px-3 py-1.5 rounded-full bg-slate-900 text-[10px] text-slate-200 hover:bg-slate-800 transition-colors"
                  >
                    Hardest system?
                  </button>
                </div>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="px-3 py-2 border-t border-slate-800/80 bg-slate-950 flex items-center gap-2"
            >
              <span className="text-[10px] text-emerald-400">AI&gt;</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about architecture, trade-offs, failures..."
                className="flex-1 bg-transparent border-none outline-none text-[11px] text-slate-100 placeholder:text-slate-600"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-1.5 rounded-full bg-blue-500 hover:bg-blue-400 disabled:opacity-40 disabled:hover:bg-blue-500 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;