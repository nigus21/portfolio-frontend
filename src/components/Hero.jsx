import React from 'react';
import { motion } from 'framer-motion';
import { FileDown, Github, Linkedin, Sparkles } from 'lucide-react';

const Hero = () => {
    const openChat = () => {
        window.dispatchEvent(new CustomEvent('openChat'));
    };

    return (
        <section id="home" className="relative min-h-[90vh] flex flex-col items-center justify-center text-center pt-20">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, staggerChildren: 0.15 }}
                className="space-y-8 w-full max-w-4xl mx-auto flex flex-col items-center"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring', bounce: 0.5 }}
                    className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md text-pink-600 px-6 py-2.5 rounded-full shadow-[0_4px_20px_rgba(236,72,153,0.15)] border border-pink-100 text-sm font-bold tracking-wide"
                >
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                    </span>
                    <span>Open to new opportunities</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 leading-[1.1]"
                >
                    Hi, I’m Nigus Dibekulu
                    <br />
                    <span className="text-gradient">— AI & Software Engineer</span>
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl md:text-3xl text-slate-600 font-bold"
                >
                    Ask my AI assistant about me!
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="max-w-2xl text-slate-500 text-lg md:text-xl leading-relaxed font-medium"
                >
                    Transforming ideas into intelligent, scalable web applications. Blending modern web frameworks with advanced AI capabilities natively from Addis Ababa, Ethiopia.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col items-center gap-6 pt-8 w-full z-10"
                >
                    {/* Main CTA */}
                    <div className="flex flex-col items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={openChat}
                            className="relative group flex items-center space-x-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-10 py-5 rounded-full font-bold text-xl md:text-2xl shadow-[0_10px_40px_rgba(236,72,153,0.5)] hover:shadow-[0_15px_50px_rgba(139,92,246,0.6)] transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                            <Sparkles className="w-7 h-7 animate-pulse text-yellow-200" />
                            <span className="relative z-10 tracking-wide">🚀 Talk to AI About Nigus</span>
                        </motion.button>
                    </div>

                    <div className="flex flex-row items-center gap-4 mt-2">
                        <motion.a
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            href="/resume.pdf"
                            target="_blank"
                            className="flex items-center space-x-2 bg-white text-slate-800 border-2 border-slate-100 px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-500/5 hover:shadow-blue-500/10 hover:border-blue-200 transition-all text-lg"
                        >
                            <FileDown className="w-5 h-5 text-blue-500" />
                            <span>Download CV</span>
                        </motion.a>

                        <div className="flex items-center gap-3">
                            <motion.a whileHover={{ y: -3 }} href="https://github.com" target="_blank" rel="noreferrer" className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-600 hover:text-purple-600 shadow-md hover:shadow-xl hover:border-purple-200 transition-all">
                                <Github className="w-6 h-6" />
                            </motion.a>
                            <motion.a whileHover={{ y: -3 }} href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-600 hover:text-blue-600 shadow-md hover:shadow-xl hover:border-blue-200 transition-all">
                                <Linkedin className="w-6 h-6" />
                            </motion.a>
                        </div>
                    </div>
                </motion.div>

            </motion.div>

            {/* Floating decorative elements */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-10 md:left-20 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-xl opacity-60 pointer-events-none"
            />
            <motion.div
                animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-10 md:right-20 w-24 h-24 bg-gradient-to-tr from-pink-400 to-purple-400 rounded-full blur-2xl opacity-50 pointer-events-none"
            />
        </section>
    );
};

export default Hero;
