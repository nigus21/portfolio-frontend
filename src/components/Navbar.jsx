import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ['home', 'projects', 'experience', 'skills', 'certifications'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && window.scrollY >= element.offsetTop - 200) {
                    setActiveMenu(section);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openChat = () => {
        window.dispatchEvent(new CustomEvent('openChat'));
    };

    const menuItems = [
        { name: 'Home', id: 'home' },
        { name: 'Projects', id: 'projects' },
        { name: 'Experience', id: 'experience' },
        { name: 'Skills', id: 'skills' },
        { name: 'Certifications', id: 'certifications' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-purple-100 shadow-md py-3' : 'bg-transparent py-5'
            }`}>
            <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                <a href="#home" className="text-2xl font-black tracking-tight text-slate-800 hover:scale-105 transition-transform">
                    Nigus<span className="text-gradient">.ai</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-1 glass px-6 py-2 rounded-full border border-purple-100/50 shadow-sm relative">
                    {menuItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`relative px-4 py-2 text-sm font-bold transition-colors ${activeMenu === item.id ? 'text-purple-600' : 'text-slate-500 hover:text-slate-800'
                                }`}
                        >
                            {activeMenu === item.id && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-purple-100/50 rounded-full border border-purple-200"
                                    transition={{ type: 'spring', duration: 0.5 }}
                                />
                            )}
                            <span className="relative z-10">{item.name}</span>
                        </a>
                    ))}
                </div>

                <button
                    onClick={openChat}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-bold text-gray-900 rounded-full group bg-gradient-to-br from-pink-500 to-blue-500 group-hover:from-pink-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all mb-0 mr-0"
                >
                    <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 group-hover:text-white flex items-center gap-2">
                        💬 Chat
                    </span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
