import TechStack from '../components/TechStack';
import { Shield, Cloud, Brain, Code, Database, Zap } from 'lucide-react';

export default function TechPage() {
  const pillars = [
    { icon: <Database size={28} />, title: 'ERP-платформа ИСА', desc: 'Собственная ERP-система с 4 600+ активными пользователями ежедневно.', color: '#3b82f6' },
    { icon: <Shield size={28} />, title: 'Информационная безопасность', desc: 'Комплексная защита: SOC, аудит ИБ, защищённые контуры для LLM.', color: '#10b981' },
    { icon: <Brain size={28} />, title: 'Искусственный интеллект', desc: 'Гибридная архитектура: локальные LLM + облачные модели, RAG, NLP.', color: '#6366f1' },
    { icon: <Cloud size={28} />, title: 'Инфраструктура', desc: 'VMware, Kubernetes, OpenStack, S3-хранилища, от ЦОД до телекоммуникаций.', color: '#8b5cf6' },
    { icon: <Code size={28} />, title: 'Разработка', desc: 'React, 1С-Bitrix, React Native, Python, Docker, CI/CD.', color: '#06b6d4' },
    { icon: <Zap size={28} />, title: 'Автоматизация', desc: 'RPA-роботы, EDI, BPMN-моделирование процессов.', color: '#eab308' },
  ];

  return (
    <>
      <section className="pt-8 sm:pt-12 pb-16 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-1/3 right-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-800/40 bg-blue-950/20 text-blue-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span className="mono">// технологии</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6">
            Технологический <span className="gradient-text">стек</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed px-2">
            Широкая экспертиза в корпоративных и промышленных ИТ-решениях
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-black text-white mb-4 sm:mb-5">Столпы <span className="gradient-text">архитектуры</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {pillars.map((p, i) => (
              <div key={i} className="p-5 sm:p-8 bg-slate-900/60 border border-white/5 rounded-2xl hover:border-white/10 transition-all group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform" style={{ background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}30` }}>{p.icon}</div>
                <h3 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3">{p.title}</h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TechStack />

      <section className="py-16 sm:py-20 lg:py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-black text-white mb-4 sm:mb-5">Архитектура <span className="gradient-text">решений</span></h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {[
              { layer: 'Приложение', items: ['Acron SuperApp', 'Корпоративный портал', 'ERP ИСА', 'ИИ-портал'], color: '#6366f1' },
              { layer: 'Сервисы', items: ['API Gateway', 'Microservices', 'RPA-оркестратор', 'ITSM'], color: '#3b82f6' },
              { layer: 'Данные', items: ['Oracle DB', 'PostgreSQL', 'ClickHouse', 'Kafka'], color: '#06b6d4' },
              { layer: 'Инфраструктура', items: ['VMware', 'Kubernetes', 'OpenStack', 'S3'], color: '#8b5cf6' },
              { layer: 'Безопасность', items: ['SIEM', 'WAF', 'DLP', 'PAM'], color: '#10b981' },
            ].map((l, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-slate-900/60 border border-white/5 rounded-xl">
                <div className="w-1.5 sm:w-2 h-10 sm:h-12 rounded-full flex-shrink-0" style={{ background: `linear-gradient(180deg, ${l.color}, ${l.color}44)` }} />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold text-sm mb-1.5 sm:mb-2">{l.layer}</div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {l.items.map((item, j) => (
                      <span key={j} className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-mono bg-slate-800 text-slate-400 border border-white/5">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
