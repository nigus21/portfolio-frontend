// src/components/Timeline.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experiences = [
  {
    title: 'Remote Software Engineer',
    company: 'Freelance / Contract',
    date: 'Oct 2024 – Present',
    description: [
      'Architected and delivered scalable web platforms with Python, React, and modern DevOps.',
      'Designed resilient backend systems and REST/GraphQL APIs.',
      'Embedded AI features into production user flows.',
      'Used algorithms and data structures to remove performance bottlenecks.',
    ],
    color: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'Programmer',
    company: 'Ministry of Innovation and Technology (MinT), Ethiopia',
    date: 'Nov 2023 – Jun 2024',
    description: [
      'Selected for a highly competitive Mastercard Foundation program (50 out of 2,200).',
      'Implemented frontends and APIs for government platforms.',
      'Built gatepass and appointment systems with React, ASP.NET Core, Docker, and microservices.',
    ],
    color: 'from-purple-500 to-fuchsia-400',
  },
  {
    title: 'Bachelor in Computer Science',
    company: 'University of Gondar',
    date: 'Graduated',
    description: [
      'Graduated with a GPA of 3.64.',
      'Deep focus on software engineering, algorithms, and machine learning.',
    ],
    color: 'from-pink-500 to-rose-400',
  },
];

const Timeline = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 10%'],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 0.4]);

  return (
    <section id="experience" className="py-20 sm:py-24 relative section-transparent">
      <div className="text-center mb-12 sm:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[9vw] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-50"
        >
          Career <span className="text-gradient">Timeline</span>
        </motion.h2>
        <p className="mt-3 sm:mt-4 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-medium">
          A vertical trace of how engineering, public service, and AI have intersected in my journey.
        </p>
      </div>

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-0">
        <motion.div
          style={{ scaleY: lineScale, opacity: lineOpacity }}
          className="origin-top absolute left-5 sm:left-1/2 sm:-ml-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full"
        />

        <div className="space-y-12 sm:space-y-16">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 110, delay: index * 0.05 }}
              className="relative flex items-start sm:items-center sm:justify-normal sm:odd:flex-row-reverse group"
            >
              <motion.div
                style={{ scale: scrollYProgress }}
                className={`absolute left-5 sm:left-1/2 w-5 h-5 -ml-[10px] rounded-full bg-gradient-to-br ${exp.color} border-[3px] border-slate-50 dark:border-slate-900 shadow-[0_0_18px_rgba(129,140,248,0.7)] top-3 sm:top-6 group-hover:scale-110 transition-transform duration-300`}
              />

              <div className="ml-14 sm:ml-0 sm:w-1/2 sm:px-10 w-full">
                <div className="glass bg-white/70 dark:bg-slate-900/80 rounded-3xl p-6 sm:p-7 border border-white/50 dark:border-slate-800/70 hover:border-purple-300/70 dark:hover:border-purple-400/70 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                  <span className="inline-flex px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-4 bg-slate-900/90 dark:bg-slate-50/90 text-slate-50 dark:text-slate-900">
                    {exp.date}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-50">{exp.title}</h3>
                  <h4 className="text-sm sm:text-lg text-purple-600 dark:text-purple-300 mb-4 sm:mb-5 font-semibold">
                    {exp.company}
                  </h4>
                  <ul className="space-y-2.5 text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm font-medium">
                    {exp.description.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-pink-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;