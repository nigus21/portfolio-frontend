// src/components/Projects.jsx
import React, { useRef, useState, memo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { projectData } from '../data/projects';

const categories = ['All', 'Full Stack & AI', 'Data Science', 'AI'];

const KineticTitle = memo(({ text, outline }) => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [0, outline ? -500 : 500]);

  return (
    <motion.div style={{ x }} className="whitespace-nowrap select-none pointer-events-none opacity-[0.03] flex">
      <h2
        className={`text-[18vw] md:text-[10rem] lg:text-[12rem] font-black uppercase leading-none px-4 ${
          outline
            ? 'text-transparent stroke-slate-900/80 dark:stroke-slate-100/70 stroke-[1.5px]'
            : 'text-slate-900/70 dark:text-slate-100/10'
        }`}
      >
        {text} {text} {text}
      </h2>
    </motion.div>
  );
});

const Projects = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const containerRef = useRef(null);

  const filteredProjects = projectData.filter((p) => filter === 'All' || p.category === filter);

  return (
    <section id="projects" ref={containerRef} className="relative py-20 sm:py-24 overflow-hidden section-transparent">
      {/* Kinetic background */}
      <div className="absolute top-0 left-0 w-full h-full flex-col justify-around py-16 z-0 hidden md:flex">
        <KineticTitle text="Portfolio" outline />
        <KineticTitle text="Architecture" outline={false} />
        <KineticTitle text="Development" outline />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-600 dark:text-blue-400 font-mono font-bold tracking-tighter uppercase text-[11px]">
              01 // Case Studies
            </span>
            <h2 className="mt-2 text-[9vw] sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-slate-50">
              Bento Projects<span className="text-blue-600 dark:text-blue-400">.</span>
            </h2>
          </motion.div>

          <div className="flex bg-slate-100/80 dark:bg-slate-900/60 backdrop-blur-md p-1 rounded-2xl border border-slate-200/60 dark:border-slate-800/70 overflow-x-auto no-scrollbar text-xs sm:text-[0.8rem]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`whitespace-nowrap px-4 sm:px-5 py-2 rounded-xl font-semibold transition-all ${
                  filter === cat
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 auto-rows-[260px] sm:auto-rows-[260px] md:auto-rows-[240px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isFeatured = project.featured;

              return (
                <motion.div
                  key={project.slug}
                  layout
                  layoutId={`card-${project.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  onClick={() => navigate(`/projects/${project.slug}`)}
                  className={`group relative cursor-pointer rounded-[2.2rem] p-6 sm:p-7 md:p-8 overflow-hidden glass bg-white/75 dark:bg-slate-900/70 border border-white/50 dark:border-slate-800/80 hover:border-blue-400/50 dark:hover:border-blue-400/60 transition-all duration-500 ${
                    isFeatured ? 'lg:col-span-2 lg:row-span-2 sm:col-span-2' : 'col-span-1 row-span-1'
                  }`}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute -inset-[40%] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.32),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.32),_transparent_60%)]" />
                  </div>

                  <div className="relative h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                          {/* abstract technical glyph */}
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.8"
                              d="M4 7h5l2-3 2 3h7M4 17h6l2 3 2-3h6M8 7v10m8-10v10"
                            />
                          </svg>
                        </div>
                        <span className="text-[9px] font-black uppercase text-slate-300 dark:text-slate-600 tracking-widest">
                          0{index + 1}
                        </span>
                      </div>

                      <h3
                        className={`font-black text-slate-900 dark:text-slate-50 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors ${
                          isFeatured ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
                        }`}
                      >
                        {project.title}
                      </h3>
                      <p
                        className={`text-slate-500 dark:text-slate-400 mt-3 font-medium leading-relaxed line-clamp-3 ${
                          isFeatured ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                        }`}
                      >
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4">
                      {project.tech.slice(0, isFeatured ? 6 : 3).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-lg text-[10px] font-semibold text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-6 text-[10px] uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 font-bold">
                    View Case Study
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;