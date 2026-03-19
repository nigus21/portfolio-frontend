import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { projectData } from '../data/projects';


const categories = ['All', 'Full Stack & AI', 'Data Science', 'AI'];

const Projects = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');

    const filteredProjects = projectData.filter(
        (p) => filter === 'All' || p.category === filter || (p.category === 'AI' && filter === 'Full Stack & AI' && p.featured)
    );

    return (
        <section id="projects" className="py-24">
            <div className="text-center mb-16">
                <motion.h2
                    onClick={() => navigate(`/projects/${project.slug}`)}
                    className="cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-extrabold text-slate-900"
                >
                    Featured <span className="text-gradient">Projects</span>
                </motion.h2>
                <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg font-medium">
                    A showcase of systems blending advanced algorithms with intuitive interfaces.
                </p>
            </div>

            <div className="flex justify-center gap-3 mb-16 flex-wrap">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all shadow-sm ${filter === cat
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-105 shadow-[0_4px_15px_rgba(139,92,246,0.3)]'
                            : 'bg-white text-slate-600 hover:text-purple-600 hover:bg-purple-50'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ duration: 0.4 }}
                            key={project.title}
                            whileHover={{ y: -10 }}
                            className={`p-8 glass rounded-3xl relative group border transition-all duration-300 ${project.featured
                                ? 'border-purple-300 shadow-purple-500/10 shadow-xl overflow-hidden'
                                : 'border-white hover:border-blue-200 hover:shadow-xl'
                                }`}
                        >
                            {project.featured && (
                                <div className="absolute top-0 right-0 py-1.5 px-5 bg-gradient-to-r from-pink-500 to-purple-500 text-xs font-extrabold tracking-wider rounded-bl-2xl text-white shadow-md">
                                    FEAT
                                </div>
                            )}
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 mt-4 group-hover:text-purple-600 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-slate-600 mb-8 text-sm md:text-base font-medium leading-relaxed flex-grow">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-auto pt-5 border-t border-slate-200">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="text-xs font-bold text-blue-700 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default Projects;
