import { motion } from 'framer-motion';

const items = [
  'ERP ИСА',
  'Информационная безопасность',
  'Acron SuperApp',
  'ИИ-портал',
  'RPA Автоматизация',
  'Веб-разработка',
  'BI & Аналитика',
  'ИТ-инфраструктура',
  'Телекоммуникации',
];

export default function Marquee() {
  return (
    <div className="relative py-3 sm:py-4 overflow-hidden border-y border-blue-900/20" style={{ background: 'rgba(10,22,40,0.4)' }}>
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg, #050d1a, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(-90deg, #050d1a, transparent)' }} />

      <motion.div
        className="flex gap-6 sm:gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="marquee-text text-slate-500 text-xs sm:text-sm font-medium flex-shrink-0 px-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600/60" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
