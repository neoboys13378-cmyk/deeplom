import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const techCategories = [
  { title: 'ERP & Бизнес-системы', color: '#3b82f6', items: ['ERP ИСА (собственная)', '1С:Предприятие 8.3', 'Oracle Database', 'Naumen GPMS', 'Naumen Service Desk'] },
  { title: 'Корпоративные порталы', color: '#f97316', items: ['1С-Bitrix', 'Корпоративный портал Акрон', 'SharePoint', 'Confluence', 'Jira'] },
  { title: 'Искусственный интеллект', color: '#6366f1', items: ['LLM (локальные)', 'RAG-архитектура', 'ИИ-портал', 'NLP', 'Computer Vision'] },
  { title: 'Безопасность', color: '#10b981', items: ['SIEM', 'PAM', 'WAF', 'VPN / NGFW', 'DLP-системы'] },
  { title: 'Инфраструктура', color: '#8b5cf6', items: ['VMware vSphere', 'Linux / Windows Server', 'Docker / Kubernetes', 'OpenStack', 'S3-совместимые хранилища'] },
  { title: 'Аналитика & BI', color: '#ec4899', items: ['Qlik Sense', 'Apache Kafka', 'ClickHouse', 'PostgreSQL', 'Data Quality Tools'] },
  { title: 'Мобильная разработка', color: '#06b6d4', items: ['React Native', 'iOS / Android', 'Acron SuperApp', 'PWA', 'MDM-решения'] },
  { title: 'Автоматизация', color: '#eab308', items: ['RPA-платформы', 'EDI', 'BPMN', 'API-интеграции', 'CI/CD'] },
];

export default function TechStack() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="tech" className="py-16 sm:py-20 lg:py-24 relative">
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={headerRef} className="text-center mb-10 sm:mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}} className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-800/40 bg-blue-950/20 text-blue-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span className="mono">// технологии</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-5">
            Технологический <span className="gradient-text">стек</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto px-2">
            Широкая экспертиза в корпоративных и промышленных ИТ-решениях
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {techCategories.map((cat, i) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { once: true, margin: '-40px' });

            return (
              <motion.div
                key={i}
                ref={ref}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                className="group relative rounded-xl sm:rounded-2xl border border-white/5 hover:border-white/10 bg-slate-900/50 hover:bg-slate-900/80 transition-all duration-300 overflow-hidden"
              >
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}66)` }} />
                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-white text-xs sm:text-sm mb-3 sm:mb-4" style={{ color: cat.color }}>{cat.title}</h3>
                  <div className="space-y-1.5 sm:space-y-2">
                    {cat.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-2 sm:gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cat.color, opacity: 0.7 }} />
                        <span className="text-slate-400 text-xs sm:text-sm group-hover:text-slate-300 transition-colors truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
