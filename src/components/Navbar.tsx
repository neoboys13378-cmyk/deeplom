import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Главная', href: '/' },
  { label: 'О компании', href: '/about' },
  { label: 'Услуги', href: '/services' },
  { label: 'Проекты', href: '/projects' },
  { label: 'Технологии', href: '/tech' },
  { label: 'Контакты', href: '/contacts' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 nav-glass border-b transition-all duration-300 ${
        scrolled
          ? 'border-blue-900/40 shadow-lg shadow-blue-950/30'
          : 'border-blue-900/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-600 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <svg width="18" height="18" className="sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="2" width="6" height="6" rx="1" fill="white" opacity="0.9"/>
                  <rect x="12" y="2" width="6" height="6" rx="1" fill="white" opacity="0.6"/>
                  <rect x="2" y="12" width="6" height="6" rx="1" fill="white" opacity="0.6"/>
                  <rect x="12" y="12" width="6" height="6" rx="1" fill="white" opacity="0.9"/>
                </svg>
              </div>
              <div className="absolute -inset-1 rounded-xl bg-blue-600/20 blur-sm group-hover:bg-blue-500/30 transition-all opacity-0 group-hover:opacity-100"/>
            </div>
            <div className="flex items-baseline">
              <span className="text-white font-bold text-base sm:text-lg tracking-tight">ACRON</span>
              <span className="text-blue-400 font-bold text-base sm:text-lg tracking-tight hidden xs:inline"> Digital</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 font-medium ${
                  location.pathname === link.href
                    ? 'text-white bg-white/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/contacts"
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/30"
            >
              Связаться
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Mobile menu btn */}
          <button
            className="lg:hidden p-2.5 -mr-2 text-slate-400 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-x-0 top-16 bottom-0 border-t border-blue-900/20 overflow-y-auto bg-slate-950/98 backdrop-blur-xl"
          >
            <div className="px-4 sm:px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-lg transition-all font-medium min-h-[52px] ${
                    location.pathname === link.href
                      ? 'text-white bg-white/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  <ChevronRight size={14} className="text-blue-500" />
                </Link>
              ))}
              <Link
                to="/contacts"
                className="flex items-center justify-center gap-2 px-4 py-3.5 mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all min-h-[52px]"
              >
                Связаться с нами
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
