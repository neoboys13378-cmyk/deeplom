import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-8 sm:py-10 relative">
      <div className="absolute inset-0 grid-overlay opacity-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="2" width="6" height="6" rx="1" fill="white" opacity="0.9"/>
                  <rect x="12" y="2" width="6" height="6" rx="1" fill="white" opacity="0.6"/>
                  <rect x="2" y="12" width="6" height="6" rx="1" fill="white" opacity="0.6"/>
                  <rect x="12" y="12" width="6" height="6" rx="1" fill="white" opacity="0.9"/>
                </svg>
              </div>
              <div>
                <span className="text-white font-bold">ACRON</span>
                <span className="text-blue-400 font-bold"> Digital</span>
              </div>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Поставщик решений в области цифровой трансформации и информационной безопасности
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4">Навигация</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-slate-500 hover:text-white text-sm transition-colors">Главная</Link>
              <Link to="/about" className="block text-slate-500 hover:text-white text-sm transition-colors">О компании</Link>
              <Link to="/services" className="block text-slate-500 hover:text-white text-sm transition-colors">Услуги</Link>
              <Link to="/projects" className="block text-slate-500 hover:text-white text-sm transition-colors">Проекты</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4">Разделы</h4>
            <div className="space-y-2">
              <Link to="/tech" className="block text-slate-500 hover:text-white text-sm transition-colors">Технологии</Link>
              <Link to="/contacts" className="block text-slate-500 hover:text-white text-sm transition-colors">Контакты</Link>
              <Link to="/admin" className="block text-slate-500 hover:text-white text-sm transition-colors">Админ-панель</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4">Контакты</h4>
            <div className="space-y-2 text-slate-500 text-sm">
              <div>г. Великий Новгород, 173012</div>
              <a href="tel:+78162996558" className="block hover:text-white transition-colors">+7 (8162) 99-65-58</a>
              <a href="mailto:info@acron.ru" className="block hover:text-white transition-colors">info@acron.ru</a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs text-center sm:text-left">
            © {currentYear} Acron Digital (ООО «АйТиОфис»). Дочерняя компания ПАО «Акрон».
          </p>
          <a href="https://www.acron.ru" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-700 hover:text-blue-500 transition-colors">acron.ru →</a>
        </div>
      </div>
    </footer>
  );
}
