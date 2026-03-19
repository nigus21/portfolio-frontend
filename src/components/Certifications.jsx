// src/components/Certifications.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

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
    <section id="certifications" className="py-20 sm:py-24 relative section-transparent">
      <div className="text-center mb-12 sm:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[9vw] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-50"
        >
          Digital <span className="text-gradient">Badges</span>
        </motion.h2>
        <p className="mt-3 sm:mt-4 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-medium">
          A holographic gallery of certifications that anchor my AI and networking foundations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto px-4 sm:px-6">
        {certsData.map((cert, index) => (
          <motion.a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            key={cert.title}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            whileHover={{ y: -6, rotateX: 6, rotateY: -6 }}
            className="relative block rounded-[1.75rem] overflow-hidden glass bg-white/75 dark:bg-slate-900/85 border border-white/60 dark:border-slate-800/80 shadow-lg hover:shadow-2xl transition-transform duration-300"
          >
            {/* Holographic shimmer */}
            <div className="pointer-events-none absolute inset-0">
              <motion.div
                initial={{ x: '-120%' }}
                whileHover={{ x: '120%' }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-tr from-white/5 via-white/40 to-transparent mix-blend-screen"
              />
            </div>

            <div className="relative p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${cert.color} text-white shadow-md`}>
                  <Award className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase bg-slate-900/90 dark:bg-slate-50/90 text-slate-50 dark:text-slate-900">
                  {cert.date}
                </span>
              </div>

              <h3 className="mt-5 text-base sm:text-lg font-bold text-slate-900 dark:text-slate-50 leading-snug">
                {cert.title}
              </h3>

              <div className="mt-4 flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-500 dark:text-slate-400 font-semibold">{cert.issuer}</span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                  View Badge
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Certifications;