import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Chatbot from './components/Chatbot';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectDetails from "./ProjectDetails";


function App() {
    return (
        <BrowserRouter>
            <div className="relative min-h-screen bg-animated-gradient text-slate-800 font-sans selection:bg-pink-500 selection:text-white">

                {/* background */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[120px] animate-blob"></div>
                    <div className="absolute top-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-purple-400/20 blur-[120px] animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-pink-400/20 blur-[120px] animate-blob animation-delay-4000"></div>
                    <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-cyan-400/20 blur-[100px] animate-blob animation-delay-3000"></div>
                </div>

                <Navbar />

                <Routes>
                    {/* Home page */}
                    <Route path="/" element={
                        <main className="pt-24 pb-12 max-w-6xl mx-auto px-6 space-y-32">
                            <Hero />
                            <Projects />
                            <Timeline />
                            <Skills />
                            <Certifications />
                        </main>
                    } />

                    {/* Project details page */}
                    <Route path="/projects/:slug" element={<ProjectDetails />} />
                </Routes>

                <footer className="border-t border-slate-200/50 py-10 mt-20 text-center text-slate-500 text-sm glass">
                    <p className="font-medium">© {new Date().getFullYear()} Nigus Dibekulu. Built with React & AI.</p>
                </footer>

                <Chatbot />
            </div>
        </BrowserRouter>
    );
}
export default App;
