import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Database, Shield, Globe, Smartphone, Network, BarChart3, Bot, Layers, Zap, Code, Cloud, Server, Wifi, Monitor, Lock, ChartArea as Chart } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const iconMap: Record<string, React.ReactNode> = {
  database: <Database size={24} />, shield: <Shield size={24} />, globe: <Globe size={24} />,
  smartphone: <Smartphone size={24} />, network: <Network size={24} />, barchart: <BarChart3 size={24} />,
  bot: <Bot size={24} />, layers: <Layers size={24} />, zap: <Zap size={24} />,
  code: <Code size={24} />, cloud: <Cloud size={24} />, server: <Server size={24} />,
  wifi: <Wifi size={24} />, monitor: <Monitor size={24} />, lock: <Lock size={24} />, chart: <Chart size={24} />,
};

const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f97316', '#06b6d4', '#ec4899', '#eab308', '#94a3b8', '#6366f1'];

function ServiceCard({ service, index }: { service: Record<string, unknown>; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const accent = colors[index % colors.length];
  const iconKey = (service.icon as string) || 'database';
  const tags = (service.tags as string[]) || [];

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: (index % 3) * 0.08 }} className="service-card bg-gradient-to-br from-blue-600/20 to-blue-800/10 border border-white/5 rounded-2xl p-5 sm:p-6 cursor-default">
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-5" style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}>
        <span style={{ color: accent }}>{iconMap[iconKey] || <Database size={24} />}</span>
      </div>
      <h3 className="text-white font-bold text-lg sm:text-xl mb-1">{service.title as string}</h3>
      <p className="text-xs font-mono text-slate-500 mb-2 sm:mb-3">{service.subtitle as string}</p>
      <p className="text-slate-400 text-sm leading-relaxed mb-4 sm:mb-5">{service.description as string}</p>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {tags.map((tag: string) => (
          <span key={tag} className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-xs font-medium" style={{ background: `${accent}12`, border: `1px solid ${accent}25`, color: accent }}>{tag}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const { content, loading } = useSite();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const services = (content.services as Record<string, unknown>[]) || [];

  if (loading) return null;

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 relative">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={headerRef} className="text-center mb-10 sm:mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-800/40 bg-blue-950/20 text-blue-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span className="mono">// услуги</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-5">
            Направления <span className="gradient-text">деятельности</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto px-2">
            Полный спектр ИТ-решений для цифровой трансформации промышленного предприятия
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((service, i) => <ServiceCard key={i} service={service} index={i} />)}
        </div>
      </div>
    </section>
  );
}
