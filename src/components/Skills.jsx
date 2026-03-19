// src/components/Skills.jsx
import React from 'react';
import { motion } from 'framer-motion';

const skillCloud = [
  {
    ring: 'Core Stack',
    level: 'center',
    color: 'from-blue-500 to-cyan-400',
    skills: ['Python', 'JavaScript', 'TypeScript', 'React', 'FastAPI'],
  },
  {
    ring: 'Advanced',
    level: 'mid',
    color: 'from-purple-500 to-fuchsia-400',
    skills: ['Next.js', 'ASP.NET Core', 'Tailwind CSS', 'Docker', 'CI/CD'],
  },
  {
    ring: 'AI & Data',
    level: 'outer',
    color: 'from-pink-500 to-rose-400',
    skills: ['Pandas', 'NumPy', 'Deep Learning', 'Reinforcement Learning', 'MLOps', 'DVC'],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 sm:py-24 section-transparent">
      <div className="text-center mb-12 sm:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[9vw] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-50"
        >
          Skill <span className="text-gradient">Radar</span>
        </motion.h2>
        <p className="mt-3 sm:mt-4 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-medium">
          A clustered view of my stack — from core execution layer to AI and data-heavy problem spaces.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_minmax(0,1fr)] items-center max-w-6xl mx-auto px-4 sm:px-6">
        {/* Radar / cloud */}
        <div className="relative aspect-square max-w-xl mx-auto">
          <div className="absolute inset-8 rounded-[2.5rem] glass bg-white/70 dark:bg-slate-900/80 border border-white/50 dark:border-slate-800/70 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_#38bdf8_0,_transparent_50%),radial-gradient(circle_at_20%_0,_#a855f7_0,_transparent_45%),radial-gradient(circle_at_80%_100%,_#ec4899_0,_transparent_55%)]" />
            <div className="relative h-full flex items-center justify-center">
              {/* Rings */}
              <div className="absolute w-[70%] h-[70%] rounded-full border border-slate-300/40 dark:border-slate-600/40" />
              <div className="absolute w-[52%] h-[52%] rounded-full border border-slate-300/50 dark:border-slate-600/50" />
              <div className="absolute w-[34%] h-[34%] rounded-full border border-slate-300/70 dark:border-slate-600/70" />

              {/* Radar nodes */}
              {skillCloud.map((ring, ringIndex) =>
                ring.skills.map((skill, i) => {
                  const angle = (i / ring.skills.length) * Math.PI * 2;
                  let radius;
                  if (ring.level === 'center') radius = 0.12;
                  else if (ring.level === 'mid') radius = 0.25;
                  else radius = 0.34;

                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <motion.div
                      key={`${ring.ring}-${skill}`}
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ delay: 0.05 * (ringIndex + i / 5) }}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="absolute"
                      style={{
                        left: `${50 + x * 100}%`,
                        top: `${50 + y * 100}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div className="px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-slate-900 dark:text-slate-50 bg-white/90 dark:bg-slate-900/90 border border-slate-200/70 dark:border-slate-700/70 shadow-[0_0_18px_rgba(129,140,248,0.35)] hover:shadow-[0_0_24px_rgba(59,130,246,0.55)] transition-shadow">
                        {skill}
                      </div>
                    </motion.div>
                  );
                })
              )}

              <div className="relative flex flex-col items-center gap-1 text-center">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500">
                  Proficiency
                </span>
                <span className="text-xs font-mono text-slate-600 dark:text-slate-300">
                  Inner → Outer : Core → Exploratory
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Legend / bento */}
        <div className="space-y-4 sm:space-y-5">
          {skillCloud.map((ring, index) => (
            <motion.div
              key={ring.ring}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -3 }}
              className="glass rounded-3xl p-4 sm:p-5 bg-white/70 dark:bg-slate-900/80 border border-white/50 dark:border-slate-800/70 relative overflow-hidden"
            >
              <div
                className={`absolute -right-10 -top-10 w-28 h-28 rounded-full bg-gradient-to-br ${ring.color} opacity-20 blur-[30px]`}
              />
              <div className="relative">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${ring.color}`} />
                  {ring.ring}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-2">
                  {ring.level === 'center'
                    ? 'Daily driver technologies I use to ship production systems.'
                    : ring.level === 'mid'
                    ? 'Stacks and tools I reach for when projects scale up.'
                    : 'AI, ML, and data tooling I explore for high-impact problems.'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;