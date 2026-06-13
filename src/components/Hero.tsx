import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Shield, Cpu, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';

const defaultWords = [
  'цифровой трансформации',
  'информационной безопасности',
  'корпоративных ERP-систем',
  'мобильных приложений',
  'ИТ-инфраструктуры',
];

function TypingText({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!words.length) return;
    const currentWord = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < currentWord.length) {
      timeout = setTimeout(() => { setText(currentWord.slice(0, charIndex + 1)); setCharIndex(c => c + 1); }, 60);
    } else if (!deleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => setDeleting(true), 2500);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => { setText(currentWord.slice(0, charIndex - 1)); setCharIndex(c => c - 1); }, 35);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex(w => (w + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words]);

  return (
    <span className="gradient-text">
      {text}
      <span className="cursor text-blue-400">|</span>
    </span>
  );
}

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-blue-500/40"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -30, 0], x: [0, Math.random() * 20 - 10, 0], opacity: [0.2, 0.8, 0.2], scale: [1, Math.random() * 2 + 0.5, 1] }}
          transition={{ duration: Math.random() * 5 + 4, repeat: Infinity, delay: Math.random() * 4, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield size={14} />,
  cpu: <Cpu size={14} />,
  globe: <Globe size={14} />,
};

export default function Hero() {
  const { content, loading } = useSite();

  if (loading) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center">
        <div className="text-slate-500 font-mono text-sm animate-pulse">Загрузка...</div>
      </section>
    );
  }

  const hero = (content.hero as Record<string, unknown>) || {};
  const words = (hero.typing_words as string[]) || defaultWords;
  const badge = (hero.badge as string) || '';
  const line1 = (hero.title_line1 as string) || 'Поставщик решений';
  const line2 = (hero.title_line2 as string) || 'в области';
  const subtitle = (hero.subtitle as string) || '';
  const badges = (hero.badges as Array<{ icon: string; text: string }>) || [];
  const stats = (hero.stats as Array<{ value: string; label: string }>) || [];

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        minHeight: 'calc(100vh - 4rem)',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,0.15) 0%, transparent 70%), #050d1a',
      }}
    >
      <div className="absolute inset-0 grid-overlay opacity-60" />
      <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <Particles />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-10 sm:py-16 lg:py-24">
        {badge && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-800/50 bg-blue-950/30 text-blue-400 text-xs sm:text-sm font-medium mb-6 sm:mb-8 break-word max-w-full">
            <span className="w-2 h-2 rounded-full bg-blue-400 pulse-dot flex-shrink-0" />{badge}
          </motion.div>
        )}

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-5 sm:mb-6">
          {line1}<br />{line2}<br /><TypingText words={words} />
        </motion.h1>

        {subtitle && (
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">{subtitle}</motion.p>
        )}

        {badges.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            {badges.map((b, i) => (
              <div key={i} className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg tag-badge text-xs sm:text-sm font-medium">
                <span className="text-blue-400">{iconMap[b.icon] || <Shield size={14} />}</span>{b.text}
              </div>
            ))}
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 px-2 sm:px-0">
          <Link to="/services" className="group flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-200 hover:shadow-2xl hover:shadow-blue-600/40 text-base sm:text-lg">
            Наши услуги <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link to="/projects" className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 border border-blue-800/50 hover:border-blue-600/80 text-slate-300 hover:text-white font-bold rounded-xl transition-all duration-200 hover:bg-blue-950/30 text-base sm:text-lg">
            Проекты
          </Link>
        </motion.div>

        {stats.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto border border-blue-900/30 rounded-2xl bg-blue-950/10 backdrop-blur p-4 sm:p-6">
            {stats.map((s, i) => (
              <div key={i} className={`text-center py-2 ${i < stats.length - 1 ? 'sm:border-r sm:border-blue-900/30 border-b sm:border-b-0 border-blue-900/20' : ''}`}>
                <div className="text-xl sm:text-2xl md:text-3xl font-black number-glow mb-1">{s.value}</div>
                <div className="text-xs text-slate-500 leading-tight">{s.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }} className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
        <span className="text-xs font-mono tracking-widest uppercase hidden sm:inline">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}><ArrowDown size={16} /></motion.div>
      </motion.div>
    </section>
  );
}
