import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSite } from '../context/SiteContext';

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  const formatted = count >= 10000 ? (count / 1000).toFixed(0) + ' 000' : count.toLocaleString('ru');
  return <span ref={ref} className="hero-stat-value number-glow text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tabular-nums">{formatted}{suffix}</span>;
}

export default function Stats() {
  const { content, loading } = useSite();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const stats = (content.stats as Array<{ value: number; suffix: string; label: string; description: string }>) || [];

  if (loading) return null;

  return (
    <section id="stats" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.06) 0%, transparent 50%, rgba(99,102,241,0.06) 100%)' }} />
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px divider-glow" />
      <div className="absolute bottom-0 left-0 right-0 h-px divider-glow" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={ref} className="text-center mb-10 sm:mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-800/40 bg-blue-950/20 text-blue-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6"><span className="mono">// цифры</span></motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-5">Масштаб <span className="gradient-text">в цифрах</span></motion.h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }} className="relative p-4 sm:p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950/60 text-center group hover:border-blue-800/40 transition-all duration-300">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <div className="mt-2 sm:mt-3 text-white font-bold text-xs sm:text-sm mb-1 sm:mb-2">{stat.label}</div>
              <div className="text-slate-500 text-[10px] sm:text-xs leading-relaxed">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
