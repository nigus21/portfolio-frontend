import React from 'react';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Chatbot from './components/Chatbot';

function App() {
    return (
        <div className="relative min-h-screen bg-animated-gradient text-slate-800 font-sans selection:bg-pink-500 selection:text-white">
            {/* Background aesthetic blobs - very soft and colorful */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[120px] animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-purple-400/20 blur-[120px] animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-pink-400/20 blur-[120px] animate-blob animation-delay-4000"></div>
                <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-cyan-400/20 blur-[100px] animate-blob animation-delay-3000"></div>
            </div>

            <nav className="fixed top-0 w-full border-b border-white/20 glass z-40">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-xl font-bold tracking-tight text-slate-800">
                        Nigus<span className="text-pink-500">.ai</span>
                    </div>
                    <a
                        href="#contact"
                        className="text-sm font-bold text-slate-600 hover:text-purple-600 transition-colors"
                    >
                        Hire Me
                    </a>
                </div>
            </nav>

            <main className="pt-24 pb-12 max-w-6xl mx-auto px-6 space-y-32">
                <Hero />
                <Skills />
                <Timeline />
                <Projects />
            </main>

            <footer className="border-t border-slate-200/50 py-10 mt-20 text-center text-slate-500 text-sm glass">
                <p className="font-medium">© {new Date().getFullYear()} Nigus Dibekulu. Built with React & AI.</p>
            </footer>

            <Chatbot />
        </div>
    );
}

export default App;
