import Contacts from '../components/Contacts';

export default function ContactsPage() {
  return (
    <>
      <section className="pt-8 sm:pt-12 pb-16 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-1/4 left-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-800/40 bg-blue-950/20 text-blue-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span className="mono">// контакты</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6">
            Свяжитесь <span className="gradient-text">с нами</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed px-2">
            Готовы обсудить ваш проект и предложить оптимальное ИТ-решение
          </p>
        </div>
      </section>

      <Contacts />

      <section className="py-16 sm:py-20 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-black text-white mb-4 sm:mb-5">
              Наши <span className="gradient-text">площадки</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { city: 'Великий Новгород', role: 'Центральный офис', address: 'Россия, 173012', status: 'Главный' },
              { city: 'Дорогобуж', role: 'Производственная площадка', address: 'ПАО «Дорогобуж»', status: 'Поддержка' },
              { city: 'Сегежа', role: 'Производственная площадка', address: 'АО «СЗФК»', status: 'Поддержка' },
            ].map((site, i) => (
              <div key={i} className="p-5 sm:p-6 bg-slate-900/60 border border-white/5 rounded-2xl hover:border-blue-800/40 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
                  <span className="text-emerald-400 text-xs font-mono">{site.status}</span>
                </div>
                <h3 className="text-white font-bold text-lg sm:text-xl mb-1">{site.city}</h3>
                <p className="text-blue-400 text-sm mb-2">{site.role}</p>
                <p className="text-slate-500 text-sm">{site.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
