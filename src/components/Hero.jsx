// src/components/Hero.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileDown, Github, Linkedin, Sparkles } from 'lucide-react';

const Hero = () => {
  const canvasRef = useRef(null);

  const openChat = () => {
    window.dispatchEvent(new CustomEvent('openChat'));
  };

  const letterVariant = {
    initial: { y: 100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
  };

  const containerVariant = {
    animate: { transition: { staggerChildren: 0.05 } },
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = `rgba(148, 163, 184, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const count = window.innerWidth < 768 ? 50 : 150;
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    const connect = () => {
      const maxDistance = 180;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.hypot(dx, dy);
          if (distance < maxDistance) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.12 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resize();
      init();
    };

    window.addEventListener('resize', handleResize);
    resize();
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden section-transparent"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 glass-light px-4 sm:px-6 py-2 rounded-full text-[9px] sm:text-[10px] md:text-xs font-black tracking-[0.25em] text-slate-500 dark:text-slate-300 uppercase flex items-center gap-3"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Available for AI-Driven Web Engineering
        </motion.div>

        <motion.div
          variants={containerVariant}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center leading-[0.85]"
        >
          <h1 className="text-[14vw] md:text-[9vw] lg:text-[7.5vw] font-black tracking-tighter text-slate-900 dark:text-slate-50 flex overflow-hidden">
            {'NIGUS'.split('').map((l, i) => (
              <motion.span key={i} variants={letterVariant}>
                {l}
              </motion.span>
            ))}
          </h1>
          <h1 className="text-[14vw] md:text-[9vw] lg:text-[7.5vw] font-black tracking-tighter text-gradient flex overflow-hidden">
            {'DIBEKULU'.split('').map((l, i) => (
              <motion.span key={i} variants={letterVariant}>
                {l}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 sm:mt-8 space-y-4 sm:space-y-6 flex flex-col items-center"
        >
          <p className="text-sm sm:text-base md:text-lg font-mono font-bold text-slate-500 dark:text-slate-300 tracking-tight">
            &lt;Fullstack_Developer /&gt; + [AI_Engineer]
          </p>

          <p className="max-w-2xl text-slate-500 dark:text-slate-300 text-xs sm:text-sm md:text-base font-medium leading-relaxed">
            I design and ship intelligent, production-grade web systems — blending high-performance engineering with
            immersive product experiences from Addis Ababa, Ethiopia.
          </p>
        </motion.div>

        <div className="mt-10 sm:mt-12 flex flex-col items-center gap-6 w-full">
          <motion.button
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97, y: 1 }}
            onClick={openChat}
            className="glass bg-slate-900/90 dark:bg-slate-50/80 text-slate-50 dark:text-slate-900 px-8 sm:px-12 py-4 sm:py-5 rounded-3xl font-black text-sm sm:text-lg md:text-xl shadow-2xl flex items-center gap-3 sm:gap-4 group"
          >
            INTERROGATE_MY_AI
          </motion.button>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <motion.a
              whileHover={{ y: -3 }}
              href="https://drive.google.com/file/d/1na7QsGTs5MU5pBjz9jWgANfgOiSHbVWq/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-bold hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <FileDown size={18} />
              <span>RESUME.PDF</span>
            </motion.a>
            <span className="w-px h-5 bg-slate-200 dark:bg-slate-700" />
            <motion.a
              whileHover={{ y: -3 }}
              href="https://github.com/nigus21"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              whileHover={{ y: -3 }}
              href="https://www.linkedin.com/in/nigus-dibekulu-208b49253/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Linkedin size={20} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;