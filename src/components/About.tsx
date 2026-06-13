import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Users, MapPin, Award, TrendingUp, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';

const iconMap: Record<string, React.ReactNode> = {
  building: <Building2 size={20} />, users: <Users size={20} />, map: <MapPin size={20} />,
  award: <Award size={20} />, trending: <TrendingUp size={20} />, briefcase: <Briefcase size={20} />,
};

export default function About() {
  const { content, loading } = useSite();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  if (loading) return null;

  const about = (content.about as Record<string, unknown>) || {};
  const features = (about.features as Array<{ icon: string; title: string; desc: string }>) || [];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-1/2" style={{ background: 'radial-gradient(ellipse 60% 80% at 0% 50%, rgba(37,99,235,0.07) 0%, transparent 70%)' }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div ref={ref}>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-800/40 bg-blue-950/20 text-blue-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6"><span className="mono">// о компании</span></motion.div>
            <motion.h2 initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5 sm:mb-6 leading-tight">
              {about.title_line1 as string}<br /><span className="gradient-text">{about.title_line2 as string}</span><br />{about.title_line3 as string}
            </motion.h2>
            <motion.p initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-base sm:text-lg text-slate-400 leading-relaxed mb-4 sm:mb-6" dangerouslySetInnerHTML={{ __html: about.paragraph1 as string }} />
            <motion.p initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="text-slate-500 leading-relaxed mb-6 sm:mb-8" dangerouslySetInnerHTML={{ __html: about.paragraph2 as string }} />
            <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link to="/services" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all text-sm hover:shadow-lg hover:shadow-blue-600/30 text-center sm:text-left">Наши услуги →</Link>
              <Link to="/contacts" className="px-6 py-3 border border-blue-800/50 hover:border-blue-600/80 text-slate-300 hover:text-white font-bold rounded-xl transition-all text-sm text-center sm:text-left">Связаться</Link>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }} className="p-4 sm:p-5 rounded-xl border border-white/5 bg-slate-900/50 hover:bg-slate-900/80 hover:border-blue-800/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-blue-600/15 border border-blue-600/20 flex items-center justify-center mb-3 text-blue-400 group-hover:bg-blue-600/25 transition-all">{iconMap[f.icon] || <Building2 size={20} />}</div>
                <h4 className="text-white font-bold text-sm mb-1.5">{f.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
