// src/components/ProjectDetails.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectData } from '../data/projects';
import { ArrowLeft, Network, Server, Globe2, Database } from 'lucide-react';

export default function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projectData.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-lg font-semibold text-slate-600 dark:text-slate-300">Project not found.</h1>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen pb-16 bg-slate-50 dark:bg-[#050505]"
    >
      {/* Header band */}
      <section className="relative overflow-hidden border-b border-slate-200/40 dark:border-slate-800/70">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/25 to-slate-900/90" />
        <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_0_0,_#38bdf8_0,_transparent_55%),radial-gradient(circle_at_100%_0,_#a855f7_0,_transparent_60%),radial-gradient(circle_at_50%_120%,_#ec4899_0,_transparent_65%)]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-100 hover:text-blue-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to projects
          </button>
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-slate-200">
            Case Study
          </span>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14">
          <motion.div
            layoutId={`tech-${project.slug}`}
            className="flex flex-wrap gap-2 mb-4 sm:mb-5"
          >
            {project.tech.map((t) => (
              <span
                key={t}
                className="bg-slate-950/50 text-slate-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] border border-slate-700/80"
              >
                {t}
              </span>
            ))}
          </motion.div>

          <motion.h1
            layoutId={`title-${project.slug}`}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-50 leading-tight max-w-3xl"
          >
            {project.title}
          </motion.h1>

          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-200/90 leading-relaxed">
            {project.description}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 sm:mt-14 space-y-10 sm:space-y-12">
        {/* Overview + meta */}
        <div className="grid gap-6 md:gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-50 mb-3">
              The Challenge
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.challenge || project.description}
            </p>
          </div>

          <aside className="glass bg-white/80 dark:bg-slate-900/90 rounded-3xl p-5 sm:p-6 border border-white/60 dark:border-slate-800/80">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 mb-3">
              Project Meta
            </h3>
            <dl className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div>
                <dt className="uppercase text-[10px] tracking-[0.2em] text-slate-400">Category</dt>
                <dd className="font-semibold">{project.category}</dd>
              </div>
              <div>
                <dt className="uppercase text-[10px] tracking-[0.2em] text-slate-400">Timeline</dt>
                <dd className="font-semibold">2026</dd>
              </div>
              {project.role && (
                <div>
                  <dt className="uppercase text-[10px] tracking-[0.2em] text-slate-400">Role</dt>
                  <dd className="font-semibold">{project.role}</dd>
                </div>
              )}
            </dl>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 text-slate-50 text-xs sm:text-sm font-semibold py-3 hover:bg-blue-600 transition-colors"
              >
                Open Live System
              </a>
            )}
          </aside>
        </div>

        {/* System Architecture */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-stretch">
          <div className="glass rounded-3xl p-5 sm:p-6 bg-white/80 dark:bg-slate-900/90 border border-white/60 dark:border-slate-800/80">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
              System Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3">
              {project.architecturePoints
                ? 'How the system is wired across client, logic, and data/AI layers.'
                : 'High-level data flow of how clients, APIs, AI services and storage collaborate inside the system.'}
            </p>

            {project.architecturePoints && (
              <ul className="mb-4 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                {project.architecturePoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}

            <div className="relative mt-4">
              <svg
                viewBox="0 0 480 260"
                className="w-full text-slate-500 dark:text-slate-400"
                role="img"
                aria-label="System architecture diagram"
              >
                {/* Client */}
                <g>
                  <rect
                    x="30"
                    y="40"
                    rx="16"
                    width="120"
                    height="60"
                    fill="currentColor"
                    className="opacity-10"
                  />
                  <rect
                    x="30"
                    y="40"
                    rx="16"
                    width="120"
                    height="60"
                    className="stroke-current"
                    fill="none"
                    strokeWidth="1.2"
                  />
                  <Globe2 x="52" y="58" className="w-5 h-5" />
                  <text x="82" y="76" fontSize="11" className="fill-current">
                    Client
                  </text>
                </g>

                {/* API */}
                <g>
                  <rect
                    x="190"
                    y="40"
                    rx="16"
                    width="120"
                    height="60"
                    fill="currentColor"
                    className="opacity-10"
                  />
                  <rect
                    x="190"
                    y="40"
                    rx="16"
                    width="120"
                    height="60"
                    className="stroke-current"
                    fill="none"
                    strokeWidth="1.2"
                  />
                  <Server x="212" y="58" className="w-5 h-5" />
                  <text x="242" y="76" fontSize="11" className="fill-current">
                    API Layer
                  </text>
                </g>

                {/* AI Service */}
                <g>
                  <rect
                    x="350"
                    y="40"
                    rx="16"
                    width="120"
                    height="60"
                    fill="currentColor"
                    className="opacity-10"
                  />
                  <rect
                    x="350"
                    y="40"
                    rx="16"
                    width="120"
                    height="60"
                    className="stroke-current"
                    fill="none"
                    strokeWidth="1.2"
                  />
                  <Network x="372" y="58" className="w-5 h-5" />
                  <text x="402" y="76" fontSize="11" className="fill-current">
                    AI Service
                  </text>
                </g>

                {/* DB */}
                <g>
                  <rect
                    x="190"
                    y="150"
                    rx="16"
                    width="120"
                    height="60"
                    fill="currentColor"
                    className="opacity-10"
                  />
                  <rect
                    x="190"
                    y="150"
                    rx="16"
                    width="120"
                    height="60"
                    className="stroke-current"
                    fill="none"
                    strokeWidth="1.2"
                  />
                  <Database x="212" y="168" className="w-5 h-5" />
                  <text x="244" y="186" fontSize="11" className="fill-current">
                    Storage
                  </text>
                </g>

                {/* Arrows */}
                <defs>
                  <marker
                    id="arrow"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M0,0 L6,3 L0,6 z" fill="currentColor" />
                  </marker>
                </defs>

                <line
                  x1="150"
                  y1="70"
                  x2="190"
                  y2="70"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  markerEnd="url(#arrow)"
                />
                <line
                  x1="310"
                  y1="70"
                  x2="350"
                  y2="70"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  markerEnd="url(#arrow)"
                />
                <line
                  x1="250"
                  y1="100"
                  x2="250"
                  y2="150"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  markerEnd="url(#arrow)"
                />
              </svg>
            </div>
          </div>

          {/* Code breakdown */}
          <div className="glass rounded-3xl p-5 sm:p-6 bg-slate-900/95 text-slate-100 border border-slate-800/80 space-y-3">
            <h2 className="text-base sm:text-lg font-semibold">Code Breakdown</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              One core pattern in this project is a hard separation between orchestration (I/O, HTTP, background tasks)
              and pure business logic or retrieval pipelines.
            </p>

            <pre className="text-[10px] sm:text-[11px] leading-relaxed bg-slate-950/70 rounded-2xl p-3 overflow-x-auto">
              <code>{`// orchestrator: thin I/O & wiring
async function handleRequest(req) {
  const dto = validate(req.body);
  const context = buildContext(req);
  return executeUseCase(dto, context);
}

// use case: pure business logic
function executeUseCase(dto, { aiClient, db }) {
  const snapshot = db.fetch(dto.projectId);
  const prediction = aiClient.score(snapshot);
  return shapeResponse({ snapshot, prediction });
}`}</code>
            </pre>
            <p className="mt-1 text-[11px] sm:text-xs text-slate-400">
              For the exam platform, this means the FastAPI layer stays thin while an AI extraction engine converts raw
              PDFs into structured JSON. For the complaint intelligence system, the orchestrator delegates to a
              retrieval-first RAG pipeline that guarantees every answer is grounded in specific complaint IDs.
            </p>

            {project.techDetails && (
              <div className="pt-2 border-t border-slate-800/80 mt-2 space-y-1.5">
                <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-400">
                  Tech Stack Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] sm:text-xs">
                  {Object.entries(project.techDetails).map(([group, items]) => (
                    <div key={group} className="flex flex-col gap-0.5">
                      <span className="font-semibold text-slate-200">{group}</span>
                      <span className="text-slate-400">{items.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
}