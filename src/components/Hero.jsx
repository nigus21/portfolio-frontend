import React from 'react';
import { motion } from 'framer-motion';
import { FileDown, Mail, Github, Linkedin, Sparkles } from 'lucide-react';

const Hero = () => {
    const openChat = () => {
        window.dispatchEvent(new CustomEvent('openChat'));
    };

    return (
        <section className="relative min-h-[70vh] flex flex-col items-start justify-center text-left pt-10" id="contact">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, staggerChildren: 0.1 }}
                className="space-y-8 w-full"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-purple-600 px-5 py-2.5 rounded-full border border-purple-200 shadow-sm text-sm font-bold tracking-wide"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
                    </span>
                    <span>Open to new opportunities</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-6xl md:text-8xl font-extrabold tracking-tight text-slate-900 leading-[1.1]"
                >
                    Nigus <span className="text-gradient">Dibekulu</span>
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl md:text-4xl text-slate-600 max-w-2xl font-semibold"
                >
                    Senior Full-Stack Engineer & AI System Designer
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="max-w-xl text-slate-500 text-lg md:text-xl leading-relaxed font-medium"
                >
                    I build intelligent, scalable applications merging next-gen web frameworks with advanced AI capabilities. Based in Addis Ababa, Ethiopia.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-5 pt-6 relative z-10"
                >
                    {/* Big Attention Grabber CTA */}
                    <div className="flex flex-col items-start sm:items-center gap-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={openChat}
                            className="relative group flex items-center space-x-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all duration-300"
                        >
                            <div className="absolute inset-0 rounded-2xl bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            {/* <Sparkles className="w-6 h-6 animate-pulse" /> */}
                            <span className="relative z-10">🤖 Don’t read my CV. Ask my AI.</span>
                        </motion.button>
                        <span className="text-xs text-slate-500 font-medium ml-2 sm:ml-0">
                            Ask about my projects, skills, or why you should hire me
                        </span>
                    </div>

                    <div className="flex flex-row gap-4 mt-4 sm:mt-0 sm:ml-4">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="/resume.pdf"
                            target="_blank"
                            className="flex items-center space-x-2 bg-white text-slate-800 border border-slate-200 px-6 py-4 rounded-2xl font-bold shadow-sm hover:shadow-md transition-all"
                        >
                            <FileDown className="w-5 h-5 text-blue-500" />
                            <span>Resume</span>
                        </motion.a>

                        <div className="flex items-center gap-3">
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:text-purple-600 shadow-sm hover:shadow-md transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:text-blue-600 shadow-sm hover:shadow-md transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
};

export default Hero;
