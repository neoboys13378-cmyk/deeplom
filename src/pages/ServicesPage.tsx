import Services from '../components/Services';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  return (
    <>
      <section className="pt-8 sm:pt-12 pb-16 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-800/40 bg-blue-950/20 text-blue-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span className="mono">// услуги</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6">
            Наши <span className="gradient-text">услуги</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed px-2">
            Полный спектр ИТ-решений для цифровой трансформации промышленного предприятия
          </p>
        </div>
      </section>

      <Services />

      <section className="py-16 sm:py-20 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-black text-white mb-4 sm:mb-5">
              Как мы <span className="gradient-text">работаем</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: '01', title: 'Аналитика', desc: 'Изучаем бизнес-процессы, выявляем узкие места и формируем ТЗ' },
              { step: '02', title: 'Проектирование', desc: 'Разрабатываем архитектуру решения с учётом требований ИБ' },
              { step: '03', title: 'Разработка', desc: 'Внедряем систему, интегрируем с существующими платформами' },
              { step: '04', title: 'Поддержка', desc: 'Обеспечиваем SLA 99.9%, мониторинг и развитие системы' },
            ].map((item, i) => (
              <div key={i} className="relative p-5 sm:p-6 bg-slate-900/60 border border-white/5 rounded-2xl hover:border-blue-800/40 transition-all">
                <div className="text-3xl sm:text-4xl font-black text-blue-900/30 mb-3">{item.step}</div>
                <h3 className="text-white font-bold text-base sm:text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[200px] sm:h-[250px] bg-blue-600/8 rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 sm:mb-6">Нужна консультация?</h2>
          <p className="text-slate-400 text-sm sm:text-base mb-6 sm:mb-8 px-2">Свяжитесь с нами — мы поможем подобрать оптимальное ИТ-решение</p>
          <Link to="/contacts" className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all hover:shadow-2xl hover:shadow-blue-600/40 text-base sm:text-lg">
            Связаться с нами <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
