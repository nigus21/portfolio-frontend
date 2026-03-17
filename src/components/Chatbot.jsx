import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: "Hi! I'm Nigus's AI assistant. Ask me anything about his skills, experience, or projects." }
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
        } catch (error) {
            setMessages((prev) => [...prev, { role: 'assistant', text: 'Error connecting to the AI server. Please make sure the backend is running.' }]);
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
                className={`fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] hover:scale-110 transition-all duration-300 z-50 ${isOpen ? 'hidden' : 'block'
                    }`}
            >
                <MessageSquare className="w-8 h-8" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[600px] bg-white/90 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden z-50 font-sans"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-5 flex justify-between items-center text-white shadow-md z-10">
                            <div className="flex items-center space-x-3">
                                <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md border border-white/30">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-white text-lg tracking-wide">Nigus.ai</h3>
                                    <div className="flex items-center gap-1.5 opacity-90">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-300"></span>
                                        </span>
                                        <span className="text-xs text-white/90 font-semibold tracking-wide">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-colors"
                                aria-label="Close chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50/50 scrollbar-thin">
                            {messages.map((msg, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={index}
                                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                                >
                                    <div className={`flex items-start max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>

                                        {msg.role === 'assistant' && (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                                                <Bot className="w-4 h-4 text-white" />
                                            </div>
                                        )}

                                        <div
                                            className={`p-4 rounded-3xl shadow-sm border ${msg.role === 'user'
                                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-tr-sm border-transparent'
                                                    : 'bg-white text-slate-700 rounded-tl-sm border-slate-100'
                                                }`}
                                        >
                                            <p className="text-[14px] leading-relaxed whitespace-pre-wrap font-medium">{msg.text}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start items-end gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0 shadow-sm">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-white border border-slate-100 p-4 rounded-3xl rounded-tl-sm shadow-sm flex space-x-2 items-center h-[52px]">
                                        <span className="w-2.5 h-2.5 bg-purple-400 flex rounded-full animate-bounce"></span>
                                        <span className="w-2.5 h-2.5 bg-pink-400 flex rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                                        <span className="w-2.5 h-2.5 bg-blue-400 flex rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Questions */}
                        {messages.length === 1 && (
                            <div className="px-5 pb-4 space-y-2 bg-slate-50/50">
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Suggested Actions</p>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleQuickQuestion("Why should we hire him?")}
                                        className="text-xs font-bold text-purple-700 bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-full transition-colors shadow-sm"
                                    >
                                        Why hire him? 🚀
                                    </button>
                                    <button
                                        onClick={() => handleQuickQuestion("Tell me about his AI experience.")}
                                        className="text-xs font-bold text-blue-700 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-full transition-colors shadow-sm"
                                    >
                                        AI Experience? 🧠
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex items-center space-x-3 z-10">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm text-slate-800 font-medium focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all placeholder:text-slate-400"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="p-3.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-md flex-shrink-0"
                            >
                                <Send className="w-5 h-5 -ml-0.5 mt-0.5" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
