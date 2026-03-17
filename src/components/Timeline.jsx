import React from 'react';
import { motion } from 'framer-motion';

const Timeline = () => {
    const experiences = [
        {
            title: 'Remote Software Engineer',
            company: 'Freelance / Contract',
            date: 'Oct 2024 – Present',
            description: [
                'Developed scalable web applications using Python, JavaScript, and React.',
                'Designed backend systems and REST APIs.',
                'Integrated AI-based features into applications.',
                'Applied data structures and algorithms to optimize performance.',
            ],
            color: 'bg-blue-500'
        },
        {
            title: 'Programmer',
            company: 'Ministry of Innovation and Technology (MinT), Ethiopia',
            date: 'Nov 2023 – Jun 2024',
            description: [
                'Selected for a highly competitive Mastercard Foundation program (50 out of 2,200 applicants).',
                'Built frontend and backend systems for government platforms.',
                'Worked on Gatepass management system and Appointment scheduler using React, ASP.NET Core API, Docker, Microservices, and Clean Architecture.',
            ],
            color: 'bg-purple-500'
        },
        {
            title: 'Bachelor in Computer Science',
            company: 'University of Gondar',
            date: 'Graduated',
            description: [
                'Achieved a GPA of 3.64.',
                'Focused on software engineering, data structures, and machine learning.',
            ],
            color: 'bg-pink-500'
        },
    ];

    return (
        <section id="experience" className="py-24 relative">
            <div className="text-center mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-extrabold text-slate-900"
                >
                    Career <span className="text-gradient">Timeline</span>
                </motion.h2>
                <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg font-medium">
                    A journey through engineering, public service, and academic excellence.
                </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-8 md:left-1/2 md:-ml-px top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-30"></div>

                <div className="space-y-16">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                            className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}
                        >
                            <div className={`absolute left-8 md:left-1/2 w-5 h-5 rounded-full ${exp.color} border-4 border-white -ml-2.5 top-6 md:top-8 shadow-[0_0_15px_rgba(139,92,246,0.5)] group-hover:scale-125 transition-transform duration-300 z-10`}></div>

                            <div className="ml-16 md:ml-0 md:w-1/2 md:px-12 w-full">
                                <div className="p-8 glass rounded-3xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-white/50 group-hover:border-purple-200">
                                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 text-white shadow-sm ${exp.color}`}>
                                        {exp.date}
                                    </span>
                                    <h3 className="text-2xl font-bold text-slate-900">{exp.title}</h3>
                                    <h4 className="text-lg text-purple-600 mb-6 font-bold">{exp.company}</h4>
                                    <ul className="space-y-3 text-slate-600 leading-relaxed text-sm lg:text-base font-medium">
                                        {exp.description.map((item, i) => (
                                            <li key={i} className="flex items-start">
                                                <span className="mr-3 text-pink-500 mt-1.5 text-lg leading-none">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Timeline;
