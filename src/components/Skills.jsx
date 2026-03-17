import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
    { category: 'Programming', items: ['Python', 'JavaScript', 'SQL', 'MATLAB'], color: 'from-blue-400 to-blue-600' },
    { category: 'Web Development', items: ['React', 'Next.js', 'FastAPI', 'ASP.NET Core', 'Tailwind CSS'], color: 'from-purple-400 to-purple-600' },
    { category: 'Data & AI', items: ['Pandas', 'NumPy', 'Machine Learning', 'Deep Learning', 'Reinforcement Learning'], color: 'from-pink-400 to-pink-600' },
    { category: 'Tools / Others', items: ['Docker', 'Git', 'CI/CD', 'Microservices', 'Clean Architecture', 'DVC'], color: 'from-cyan-400 to-cyan-600' },
];

const Skills = () => {
    return (
        <section className="py-24">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-extrabold text-slate-900"
                >
                    Core <span className="text-gradient">Skills</span>
                </motion.h2>
                <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg font-medium">
                    Expertise across the full stack, with specialized knowledge in Data Science and Machine Learning.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {skillsData.map((skillGroup, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="p-8 rounded-3xl glass relative group overflow-hidden"
                    >
                        <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${skillGroup.color} opacity-10 rounded-full blur-[30px] group-hover:opacity-20 transition-all duration-500`}></div>
                        <h3 className="text-2xl font-bold mb-6 text-slate-800 relative z-10 flex items-center gap-3">
                            <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${skillGroup.color}`}></span>
                            {skillGroup.category}
                        </h3>
                        <div className="flex flex-wrap gap-3 relative z-10">
                            {skillGroup.items.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="px-5 py-2.5 bg-white/80 border border-slate-100 shadow-sm rounded-xl text-sm font-bold text-slate-700 hover:text-purple-600 hover:border-purple-200 transition-colors"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
