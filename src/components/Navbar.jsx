// src/components/Navbar.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sparkles, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const sections = ['home', 'projects', 'experience', 'skills', 'certifications'];

const Navbar = ({ theme, onToggleTheme }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

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

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const openChat = () => {
    window.dispatchEvent(new CustomEvent('openChat'));
  };

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = navRef.current?.getBoundingClientRect().height ?? 88;
    const offset = navHeight + 10; // account for navbar height + spacing
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  const handleNavClick = (id) => {
    setIsMobileMenuOpen(false);
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
        ref={navRef}
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: scrolled ? 0.96 : 1,
        }}
        transition={{ type: 'spring', stiffness: 140, damping: 16 }}
        className="pointer-events-auto relative"
      >
        <div className="glass dark:bg-slate-900/70 dark:border-slate-700/70 flex items-center justify-between gap-3 sm:gap-6 px-3 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-xl border border-white/40 dark:border-white/10 w-[calc(100vw-2rem)] sm:w-auto">
          {/* Brand */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-1.5 min-w-0 text-xs sm:text-sm font-black tracking-[0.18em] uppercase text-slate-700 dark:text-slate-100"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 text-[0.7rem] text-white shadow-md">
              <Sparkles className="w-3 h-3" />
            </span>
            <span className="truncate max-w-[6.5rem] sm:max-w-none">NIGUS.AI</span>
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

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className="md:hidden relative inline-flex items-center justify-center w-10 h-7 rounded-full bg-slate-900/10 dark:bg-slate-100/10 border border-slate-900/15 dark:border-slate-100/15 hover:bg-slate-900/20 dark:hover:bg-slate-100/20 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </button>

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

        {/* Mobile panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              className="absolute top-full left-0 right-0 mt-3 px-4 z-50"
            >
              <div className="mx-auto max-w-[420px]">
                <div className="glass rounded-3xl p-3 sm:p-4 border border-white/50 dark:border-slate-800/70">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-white/30 dark:bg-slate-900/30 border border-white/30 dark:border-slate-800/50">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 text-[0.7rem] text-white shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-[0.8rem] font-black tracking-[0.18em] uppercase text-slate-700 dark:text-slate-100 truncate">
                        NIGUS.AI
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Navigate & toggle theme</div>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1.5 px-2">
                    {sections.map((id) => {
                      const label = id[0].toUpperCase() + id.slice(1);
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => handleNavClick(id)}
                          className={`w-full text-left px-3 py-2 rounded-2xl text-[0.9rem] font-semibold transition-colors ${
                            activeMenu === id
                              ? 'bg-slate-900/10 dark:bg-slate-100/10 text-slate-900 dark:text-slate-100'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-900/5 dark:hover:bg-slate-100/5'
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-3 px-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openChat();
                      }}
                      className="w-full items-center justify-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-xs font-semibold text-white shadow-lg hover:shadow-xl transition-transform"
                    >
                      <span className="text-xs">●</span>
                      <span>Interrogate My AI</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Navbar;