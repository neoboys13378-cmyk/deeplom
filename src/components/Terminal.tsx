import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const lines = [
  { type: 'comment', text: '# Acron Digital — системы в работе' },
  { type: 'cmd', text: '$ status --all-systems' },
  { type: 'output', text: '  ✓ ERP ИСА              [ONLINE]  4600+ users' },
  { type: 'output', text: '  ✓ ITSM ServiceDesk     [ONLINE]  SLA 99.9%' },
  { type: 'output', text: '  ✓ ИИ-портал            [ONLINE]  hybrid LLM' },
  { type: 'output', text: '  ✓ Acron SuperApp        [ONLINE]  iOS + Android' },
  { type: 'output', text: '  ✓ ЭДО система          [ONLINE]  40k+ docs/year' },
  { type: 'output', text: '  ✓ RPA роботы           [ONLINE]  24/7 auto' },
  { type: 'output', text: '  ✓ ИБ-контур            [SECURE]  0 incidents' },
  { type: 'cmd', text: '$ deploy --project=ai-portal --env=prod' },
  { type: 'success', text: '  ✓ Build passed: 847 components' },
  { type: 'success', text: '  ✓ Security scan: OK' },
  { type: 'success', text: '  ✓ Deployed to production ✨' },
  { type: 'cmd', text: '$ acron --transform=digital --scale=enterprise' },
  { type: 'success', text: '  ✓ Digital transformation: IN PROGRESS...' },
];

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    if (visibleLines >= lines.length) return;

    const timer = setTimeout(() => {
      setVisibleLines((v) => v + 1);
    }, 80);

    return () => clearTimeout(timer);
  }, [isInView, visibleLines]);

  const getColor = (type: string) => {
    switch (type) {
      case 'comment': return 'text-slate-600';
      case 'cmd': return 'text-blue-400';
      case 'success': return 'text-emerald-400';
      case 'output': return 'text-slate-300';
      default: return 'text-slate-300';
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/5"
          style={{ background: '#0d1117' }}
        >
          <div className="flex items-center gap-2 px-3 sm:px-5 py-2.5 sm:py-3 border-b border-white/5" style={{ background: '#161b22' }}>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 sm:ml-4 text-slate-500 text-[10px] sm:text-xs font-mono truncate">acron-digital ~ terminal</span>
            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 pulse-dot" />
              <span className="text-emerald-500 text-[10px] sm:text-xs font-mono">connected</span>
            </div>
          </div>

          <div className="p-3 sm:p-6 font-mono text-xs sm:text-sm min-h-48 sm:min-h-64">
            {lines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className={`${getColor(line.type)} leading-5 sm:leading-7`}>{line.text}</div>
            ))}
            {visibleLines < lines.length && <span className="text-blue-400 cursor">█</span>}
            {visibleLines >= lines.length && <div className="mt-2 text-blue-400">$ <span className="cursor">_</span></div>}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
