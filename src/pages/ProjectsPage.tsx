import Projects from '../components/Projects';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ProjectsPage() {
  return (
    <>
      <section className="pt-8 sm:pt-12 pb-16 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-1/3 left-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-800/40 bg-blue-950/20 text-blue-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span className="mono">// проекты</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6">
            Ключевые <span className="gradient-text">проекты</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed px-2">
            Реальные результаты цифровой трансформации промышленного гиганта
          </p>
        </div>
      </section>

      <Projects />

      <section className="py-16 sm:py-20 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-black text-white mb-4 sm:mb-5">
              Результаты <span className="gradient-text">в цифрах</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              { value: '99.9%', label: 'Uptime систем', desc: 'Гарантия доступности' },
              { value: '40 000+', label: 'Документов / год', desc: 'Наряды-допуски' },
              { value: '30 дней', label: 'Внедрение ИИ', desc: 'Коробочное решение' },
              { value: '25 000+', label: 'Актов ЭДО / год', desc: 'Учёт ТМЦ' },
            ].map((item, i) => (
              <div key={i} className="p-4 sm:p-6 bg-slate-900/60 border border-white/5 rounded-2xl text-center hover:border-blue-800/40 transition-all">
                <div className="text-2xl sm:text-3xl font-black number-glow mb-2">{item.value}</div>
                <div className="text-white font-bold text-xs sm:text-sm mb-1">{item.label}</div>
                <div className="text-slate-500 text-[10px] sm:text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 sm:mb-6">У вас похожая задача?</h2>
          <p className="text-slate-400 text-sm sm:text-base mb-6 sm:mb-8 px-2">Мы можем реализовать проект любой сложности</p>
          <Link to="/contacts" className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all hover:shadow-2xl hover:shadow-blue-600/40 text-base sm:text-lg">
            Обсудить проект <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
