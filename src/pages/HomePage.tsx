import Hero from '../components/Hero';
import Stats from '../components/Stats';
import { useSite } from '../context/SiteContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { loading } = useSite();
  if (loading) return null;

  return (
    <>
      <Hero />

      <section className="py-16 sm:py-20 lg:py-24 relative">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-800/40 bg-blue-950/20 text-blue-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="mono">// почему мы</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-5">
              Почему выбирают <span className="gradient-text">Acron Digital</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { num: '01', title: 'Внутренний интегратор', desc: 'Глубокое понимание бизнес-процессов группы «Акрон». Мы не просто внедряем технологии — мы знаем, как они работают на производстве.' },
              { num: '02', title: 'Полный цикл', desc: 'От аналитики и проектирования до разработки, внедрения и многолетнего сопровождения. Один поставщик — один ответственный.' },
              { num: '03', title: 'Масштаб и экспертиза', desc: 'Более 4 600 пользователей ERP, 10 000+ сотрудников на поддержке, опыт работы с промышленными системами мирового уровня.' },
            ].map((item, i) => (
              <div key={i} className="p-5 sm:p-8 bg-slate-900/60 border border-white/5 rounded-2xl hover:border-blue-800/40 transition-all group">
                <div className="text-4xl sm:text-5xl font-black text-blue-900/40 mb-3 sm:mb-4 group-hover:text-blue-800/60 transition-colors">{item.num}</div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Stats />

      <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[250px] sm:h-[400px] bg-blue-600/8 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 sm:mb-6">
            Готовы к цифровой трансформации?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
            Acron Digital создаёт решения, которые меняют промышленность. Узнайте, как мы можем помочь вашему бизнесу.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-2 sm:px-0">
            <Link to="/services" className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all hover:shadow-2xl hover:shadow-blue-600/40 text-base sm:text-lg">
              Наши услуги <ArrowRight size={18} />
            </Link>
            <Link to="/contacts" className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 border border-blue-800/50 hover:border-blue-600/80 text-slate-300 hover:text-white font-bold rounded-xl transition-all text-base sm:text-lg">
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
