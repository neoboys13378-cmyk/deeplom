import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';

function ProjectCard({ project, index }: { project: Record<string, unknown>; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const color = (project.badgeColor as string) || '#3b82f6';

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: (index % 2) * 0.1 }} className="relative group bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-white/5 hover:border-blue-800/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/30">
      {(project.hot as boolean) && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 pulse-dot" />NEW
        </div>
      )}
      <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-[10px] sm:text-xs font-bold mono flex-shrink-0" style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}>{project.badge as string}</div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Calendar size={12} className="text-slate-600" />
            <span className="text-xs text-slate-500 font-mono">{project.year as string}</span>
            <span className="text-xs text-slate-600">·</span>
            <span className="text-xs text-slate-500 truncate">{project.category as string}</span>
          </div>
          <h3 className="text-white font-bold text-lg sm:text-xl leading-tight">{project.title as string}</h3>
        </div>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed mb-4 sm:mb-5">{project.description as string}</p>
      <div className="space-y-2 sm:space-y-2.5">
        {((project.results as string[]) || []).map((result: string, i: number) => (
          <div key={i} className="flex items-start gap-2 sm:gap-2.5">
            <CheckCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color }} />
            <span className="text-slate-300 text-sm">{result}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 sm:mt-6 flex items-center gap-2 text-slate-600 group-hover:text-blue-400 transition-colors text-sm font-medium">
        <span>Подробнее</span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { content, loading } = useSite();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const projects = (content.projects as Record<string, unknown>[]) || [];

  if (loading) return null;

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-700/5 rounded-full blur-3xl" /></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={headerRef} className="text-center mb-10 sm:mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}} className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-800/40 bg-blue-950/20 text-blue-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6"><span className="mono">// проекты</span></motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-5">Ключевые <span className="gradient-text">проекты</span></motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto px-2">Реальные результаты цифровой трансформации промышленного гиганта</motion.p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {projects.map((project: Record<string, unknown>, i: number) => <ProjectCard key={i} project={project} index={i} />)}
        </div>
      </div>
    </section>
  );
}
