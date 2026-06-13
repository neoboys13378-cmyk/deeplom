import About from '../components/About';
import Terminal from '../components/Terminal';
import Stats from '../components/Stats';

export default function AboutPage() {
  return (
    <>
      <section className="pt-8 sm:pt-12 pb-16 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-800/40 bg-blue-950/20 text-blue-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span className="mono">// о компании</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6">
            Acron <span className="gradient-text">Digital</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed px-2">
            Дочерняя компания ПАО «Акрон» — поставщик решений и сервисов в области цифровой трансформации и информационной безопасности
          </p>
        </div>
      </section>

      <About />
      <Terminal />
      <Stats />

      <section className="py-16 sm:py-20 lg:py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-black text-white mb-4 sm:mb-5">
              Путь <span className="gradient-text">цифровизации</span>
            </h2>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {[
              { year: '2018', title: 'Начало', desc: 'Создание внутреннего ИТ-подразделения для поддержки производственных площадок группы «Акрон»' },
              { year: '2020', title: 'ERP ИСА', desc: 'Разработка и запуск корпоративной ERP-системы ИСА собственной разработки для более чем 4 600 пользователей' },
              { year: '2022', title: 'ЭДО', desc: 'Запуск системы электронного документооборота — 40 000+ нарядов-допусков и 25 000+ актов движения ТМЦ ежегодно' },
              { year: '2024', title: 'RPA и BI', desc: 'Внедрение роботизированной автоматизации процессов и BI-аналитики на базе Qlik Sense' },
              { year: '2025', title: 'SuperApp и ИИ', desc: 'Запуск Acron SuperApp — единого мобильного приложения с ИИ-помощником для всех предприятий группы' },
              { year: '2026', title: 'ИИ-портал', desc: 'Внедрение корпоративного ИИ-портала на базе гибридной архитектуры (локальные + облачные LLM)' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 sm:gap-6 group">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600/20 border border-blue-600/40 flex items-center justify-center text-blue-400 font-bold text-xs sm:text-sm group-hover:bg-blue-600/30 transition-all">
                    {item.year}
                  </div>
                  {i < 5 && <div className="w-px h-full bg-blue-900/30 mt-2" />}
                </div>
                <div className="pb-6 sm:pb-8 min-w-0">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-sm sm:text-base">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
