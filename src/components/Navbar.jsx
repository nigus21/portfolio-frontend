// src/components/Navbar.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const sections = ['home', 'projects', 'experience', 'skills', 'certifications'];

const Navbar = ({ theme, onToggleTheme }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (y >= el.offsetTop - 200) {
          setActiveMenu(id);
        }
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openChat = () => {
    window.dispatchEvent(new CustomEvent('openChat'));
  };

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 88; // account for navbar height
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  const handleNavClick = (id) => {
    // Always route back to home, then scroll to section
    if (window.location.pathname !== '/') {
      navigate('/', { replace: false });
      // Give React Router a tick to paint, then scroll
      setTimeout(() => scrollToSection(id), 50);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: scrolled ? 0.96 : 1,
        }}
        transition={{ type: 'spring', stiffness: 140, damping: 16 }}
        className="pointer-events-auto"
      >
        <div className="glass dark:bg-slate-900/70 dark:border-slate-700/70 flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-xl border border-white/40 dark:border-white/10">
          {/* Brand */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-black tracking-[0.18em] uppercase text-slate-700 dark:text-slate-100"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 text-[0.7rem] text-white shadow-md">
              <Sparkles className="w-3 h-3" />
            </span>
            <span>NIGUS.AI</span>
          </button>

          {/* Menu */}
          <LayoutGroup>
            <div className="hidden md:flex items-center gap-1 text-[0.7rem] sm:text-xs font-semibold relative">
              {sections.map((id) => {
                const label = id[0].toUpperCase() + id.slice(1);
                return (
                  <button
                    type="button"
                    key={id}
                    className="relative px-3 py-1.5 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                    onClick={() => handleNavClick(id)}
                  >
                    {activeMenu === id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-slate-900/5 dark:bg-slate-100/10 border border-slate-900/10 dark:border-slate-100/10"
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              className="relative inline-flex items-center justify-center w-11 h-6 rounded-full bg-slate-900/10 dark:bg-slate-100/10 border border-slate-900/15 dark:border-slate-100/15 overflow-hidden"
            >
              <motion.div
                layout
                className="absolute w-5 h-5 rounded-full bg-white dark:bg-slate-900 shadow-md flex items-center justify-center"
                animate={{ x: theme === 'dark' ? 11 : -11, rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                {theme === 'dark' ? (
                  <Moon className="w-3 h-3 text-slate-100" />
                ) : (
                  <Sun className="w-3 h-3 text-yellow-400" />
                )}
              </motion.div>
            </button>

            {/* Chat CTA */}
            <button
              onClick={openChat}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-[0.7rem] sm:text-xs font-semibold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-transform"
            >
              <span className="text-xs">●</span>
              <span>Interrogate My AI</span>
            </button>
          </div>
        </div>
      </motion.nav>
    </header>
  );
};

export default Navbar;