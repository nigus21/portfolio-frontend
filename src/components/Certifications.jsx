import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

const certsData = [
    {
        title: 'Supervised Machine Learning: Regression and Classification',
        issuer: 'Stanford University (Andrew Ng)',
        date: '2023',
        link: '#',
        color: 'from-blue-400 to-cyan-400',
    },
    {
        title: 'KIFIYA AI Mastery Training Program',
        issuer: 'KIFIYA Financial Technology',
        date: '2023',
        link: '#',
        color: 'from-purple-400 to-pink-400',
    },
    {
        title: 'Advanced Learning Algorithms',
        issuer: 'Stanford University (Andrew Ng)',
        date: '2023',
        link: '#',
        color: 'from-indigo-400 to-purple-400',
    },
    {
        title: 'CCNA Certification',
        issuer: 'Cisco',
        date: '2022',
        link: '#',
        color: 'from-pink-400 to-orange-400',
    },
];

const Certifications = () => {
    return (
        <section id="certifications" className="py-24 relative">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-extrabold text-slate-900"
                >
                    My <span className="text-gradient">Certifications</span>
                </motion.h2>
                <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg font-medium">
                    Continuous learning and verified expertise in AI and networking.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {certsData.map((cert, index) => (
                    <motion.a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="p-8 rounded-3xl glass relative group overflow-hidden border border-white hover:border-purple-200 shadow-sm hover:shadow-xl transition-all duration-300 block"
                    >
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cert.color} opacity-20 rounded-bl-full blur-[30px] group-hover:opacity-40 transition-all duration-500`}></div>

                        <div className="flex items-start justify-between">
                            <div className={`p-4 rounded-2xl bg-gradient-to-br ${cert.color} text-white shadow-md mb-6 inline-block`}>
                                <Award className="w-8 h-8" />
                            </div>
                            <ExternalLink className="w-6 h-6 text-slate-300 group-hover:text-purple-500 transition-colors" />
                        </div>

                        <h3 className="text-2xl font-bold mb-3 text-slate-800 relative z-10 group-hover:text-purple-600 transition-colors leading-tight">
                            {cert.title}
                        </h3>

                        <div className="flex justify-between items-center mt-6 border-t border-slate-100 pt-5">
                            <span className="text-slate-500 font-bold">{cert.issuer}</span>
                            <span className="px-4 py-1.5 bg-slate-100 rounded-full text-xs font-bold text-slate-600 tracking-wider">
                                {cert.date}
                            </span>
                        </div>
                    </motion.a>
                ))}
            </div>
        </section>
    );
};

export default Certifications;
