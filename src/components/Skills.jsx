// src/components/Skills.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiTailwindcss,
  SiFastapi,
  SiNextdotjs,
  SiLaravel,
  SiDocker,
  SiPandas,
  SiNumpy,
} from 'react-icons/si';

import { DiDotnet } from 'react-icons/di';

const getSkillIcon = (skill) => {
  const s = skill.toLowerCase();

  if (s === 'react') return <SiReact />;
  if (s === 'javascript') return <SiJavascript />;
  if (s === 'typescript') return <SiTypescript />;
  if (s === 'python') return <SiPython />;
  if (s.includes('tailwind')) return <SiTailwindcss />;

  if (s.includes('asp.net')) return <DiDotnet />;
  if (s === 'fastapi') return <SiFastapi />;
  if (s.includes('next.js')) return <SiNextdotjs />;
  if (s.includes('laravel')) return <SiLaravel />;
  if (s === 'docker') return <SiDocker />;

  if (s === 'pandas') return <SiPandas />;
  if (s === 'numpy') return <SiNumpy />;

  return <span className="text-[10px] font-bold">{skill.slice(0, 2)}</span>;
};

const skillCloud = [
  {
    ring: 'Inner Circle',
    subtitle: 'Core Stack',
    level: 'center',
    color: 'from-blue-500 to-cyan-400',
    skills: ['React', 'JavaScript', 'TypeScript', 'Python', 'Tailwind CSS'],
  },
  {
    ring: 'Middle Circle',
    subtitle: 'Advanced/Scaling',
    level: 'mid',
    color: 'from-purple-500 to-fuchsia-400',
    skills: ['ASP.NET Core', 'FastAPI', 'Next.js', 'laravel', 'Docker', 'CI/CD'],
  },
  {
    ring: 'Outer Circle',
    subtitle: 'AI & Data Heavy',
    level: 'outer',
    color: 'from-pink-500 to-rose-400',
    skills: ['Pandas', 'NumPy', 'Deep Learning', 'Reinforcement Learning', 'MLOps', 'DVC'],
  },
];

const Skills = () => {
  const reduceMotion = useReducedMotion();
  const visibleCount = 5;

  // Flatten all skills into fixed radar positions.
  const nodes = useMemo(() => {
    const out = [];

    skillCloud.forEach((ring, ringIndex) => {
      ring.skills.forEach((skill, i) => {
        const angle = (i / ring.skills.length) * Math.PI * 2;
        let radius;
        if (ring.level === 'center') radius = 0.12;
        else if (ring.level === 'mid') radius = 0.23;
        else radius = 0.29;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        out.push({
          id: `${ring.ring}-${skill}`,
          ringIndex,
          skill,
          ring,
          glyph: getSkillIcon(skill),
          x,
          y,
          delay: 0.05 * (ringIndex + i / 5),
        });
      });
    });

    return out;
  }, []);

  const [visibleStartIndex, setVisibleStartIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    // Match the sweep pace (~7.5s per full rotation) with 5-step icon rotation.
    const intervalMs = 1500;
    const t = setInterval(() => {
      setVisibleStartIndex((v) => (v + 1) % nodes.length);
    }, intervalMs);

    return () => clearInterval(t);
  }, [reduceMotion, nodes.length]);

  const visibleIds = useMemo(() => {
    const ids = new Set();
    const total = nodes.length;
    if (total === 0) return ids;

    for (let k = 0; k < visibleCount; k++) {
      ids.add(nodes[(visibleStartIndex + k) % total].id);
    }
    return ids;
  }, [nodes, visibleStartIndex]);

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

      <div className="flex flex-col lg:flex-row gap-10 items-center max-w-6xl mx-auto px-4 sm:px-6">
        {/* Radar / cloud */}
        <div className="relative w-full lg:w-2/3 aspect-square mx-auto">
          <div className="absolute inset-0 rounded-full glass bg-white/60 dark:bg-slate-900/75 border border-white/50 dark:border-slate-800/70 overflow-visible">
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_#38bdf8_0,_transparent_55%),radial-gradient(circle_at_20%_0,_#a855f7_0,_transparent_45%),radial-gradient(circle_at_80%_100%,_#ec4899_0,_transparent_60%)]" />

            {/* Crosshair lines to make it feel more "radar-like" */}
            <div className="absolute left-1/2 top-6 bottom-6 w-px bg-slate-300/20 dark:bg-slate-600/25 -translate-x-1/2" />
            <div className="absolute top-1/2 left-6 right-6 h-px bg-slate-300/20 dark:bg-slate-600/25 -translate-y-1/2" />

            <div className="relative h-full flex items-center justify-center">
              {/* Radar sweep */}
              {!reduceMotion && (
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full opacity-45 [filter:blur(0.2px)]"
                  style={{
                    background:
                      'conic-gradient(from 90deg, rgba(56,189,248,0) 0deg, rgba(56,189,248,0.35) 10deg, rgba(168,85,247,0.18) 28deg, rgba(236,72,153,0) 60deg, rgba(236,72,153,0) 360deg)',
                    transformOrigin: '50% 50%',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 7.5, repeat: Infinity, ease: 'linear' }}
                />
              )}

              {/* Rings */}
              <motion.div
                className="absolute w-[70%] h-[70%] rounded-full border border-slate-300/40 dark:border-slate-600/40"
                animate={reduceMotion ? undefined : { scale: [1, 1.02, 1] }}
                transition={reduceMotion ? undefined : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute w-[52%] h-[52%] rounded-full border border-slate-300/50 dark:border-slate-600/50"
                animate={reduceMotion ? undefined : { scale: [1, 1.015, 1] }}
                transition={reduceMotion ? undefined : { duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute w-[34%] h-[34%] rounded-full border border-slate-300/70 dark:border-slate-600/70"
                animate={reduceMotion ? undefined : { scale: [1, 1.01, 1] }}
                transition={reduceMotion ? undefined : { duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Radar nodes (max 5 visible at a time) */}
              {nodes.map((node) => {
                const isVisible = visibleIds.has(node.id);
                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{
                      opacity: isVisible ? 1 : 0,
                      scale: isVisible ? 1 : 0.75,
                    }}
                    transition={{ duration: 0.35, ease: 'easeOut', delay: isVisible ? node.delay : 0 }}
                    whileHover={isVisible ? { scale: 1.08, y: -2 } : undefined}
                    className="absolute"
                    style={{
                      left: `${50 + node.x * 100}%`,
                      top: `${50 + node.y * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div
  title={node.skill}
  className={`w-11 h-11 rounded-full bg-gradient-to-br ${node.ring.color} p-[1px] shadow-[0_0_20px_rgba(99,102,241,0.35)]`}
>
  <div className="w-full h-full rounded-full bg-white/90 dark:bg-slate-900/90 flex items-center justify-center">
    <div className="text-lg">
      {getSkillIcon(node.skill)}
    </div>
  </div>
</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend / bento */}
        <div className="w-full lg:w-1/3 space-y-4 sm:space-y-5">
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
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${ring.color}`} />
                  <div className="text-[11px] uppercase tracking-[0.22em] font-bold text-slate-500 dark:text-slate-400">
                    {ring.ring}
                  </div>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-50 mb-3">
                  {ring.subtitle}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ring.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-full text-[10px] font-semibold text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70 bg-white/50 dark:bg-slate-950/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;