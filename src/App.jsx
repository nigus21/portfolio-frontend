// src/App.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Chatbot from './components/Chatbot';
import ProjectDetails from './components/ProjectDetails';

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-[#050505] dark:text-slate-100 font-sans selection:text-white selection:bg-blue-500/70">
        {/* Ambient blobs */}
        <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/15 dark:bg-blue-500/10 blur-[120px] animate-blob" />
          <div className="absolute top-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-purple-400/15 dark:bg-purple-500/10 blur-[120px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-pink-400/15 dark:bg-pink-500/10 blur-[120px] animate-blob animation-delay-4000" />
          <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-cyan-400/15 dark:bg-cyan-500/10 blur-[100px] animate-blob animation-delay-3000" />
        </div>

        <Navbar theme={theme} onToggleTheme={toggleTheme} />

        <Routes>
          <Route
            path="/"
            element={
              <main
                className="relative pt-24 md:pt-28 pb-16 md:pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32 main-content-fluid"
                style={{ overflowX: 'hidden' }}
              >
                <Hero />
                <Projects />
                <Timeline />
                <Skills />
                <Certifications />
              </main>
            }
          />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
        </Routes>

        <footer className="mt-20 border-t border-slate-200/40 dark:border-slate-800/60 py-8 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 glass-light">
          <p className="font-medium">
            © {new Date().getFullYear()} Nigus Dibekulu · Crafted with React, Framer Motion & AI.
          </p>
        </footer>

        <Chatbot />
      </div>
    </BrowserRouter>
  );
}

export default App;