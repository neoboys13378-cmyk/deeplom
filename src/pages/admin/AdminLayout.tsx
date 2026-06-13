import { useState } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Type, Settings, LogOut, ChevronRight,
  Shield, BarChart3, MapPin, Database, Menu, X, Home, Cloud, Server
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const navItems = [
  { label: 'Дашборд', href: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'Главный экран', href: '/admin/dashboard/hero', icon: <Type size={18} /> },
  { label: 'О компании', href: '/admin/dashboard/about', icon: <Shield size={18} /> },
  { label: 'Услуги', href: '/admin/dashboard/services', icon: <BarChart3 size={18} /> },
  { label: 'Проекты', href: '/admin/dashboard/projects', icon: <Database size={18} /> },
  { label: 'Статистика', href: '/admin/dashboard/stats', icon: <BarChart3 size={18} /> },
  { label: 'Контакты', href: '/admin/dashboard/contacts', icon: <MapPin size={18} /> },
  { label: 'Настройки', href: '/admin/dashboard/settings', icon: <Settings size={18} /> },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, session, dbType } = useSite();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex gradient-bg">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-950/95 border-r border-white/5 backdrop-blur-xl flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <Shield size={18} className="text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-sm">ACRON</span>
              <span className="text-blue-400 font-bold text-sm"> Admin</span>
            </div>
          </div>
          <button className="lg:hidden text-slate-500 p-2" onClick={() => setMobileOpen(false)}><X size={20} /></button>
        </div>

        <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-600/40 flex items-center justify-center text-blue-400 text-xs font-bold">
              {session?.username?.charAt(0).toUpperCase() ?? 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate">{session?.username}</div>
              <div className="flex items-center gap-1 text-slate-600 text-xs">
                {dbType === 'supabase' ? <Cloud size={10} /> : <Server size={10} />}
                <span>{dbType === 'supabase' ? 'Supabase' : 'IndexedDB'}</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-2 sm:p-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.href || (item.href !== '/admin/dashboard' && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active ? 'bg-blue-600/15 text-blue-400 border border-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                {item.label}
                {active && <ChevronRight size={14} className="ml-auto text-blue-500/60" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 sm:p-3 space-y-1 border-t border-white/5">
          <a href="#/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-slate-500 hover:text-white hover:bg-white/5 transition-all">
            <Home size={18} />Открыть сайт
          </a>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-900/10 transition-all">
            <LogOut size={18} />Выйти
          </button>
        </div>
      </motion.aside>

      {mobileOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="flex items-center gap-4 px-4 sm:px-6 py-3 sm:py-4 border-b border-white/5 bg-slate-950/60 backdrop-blur-sm">
          <button className="lg:hidden p-2 -ml-2 text-slate-500" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
          <h1 className="text-white font-bold text-base sm:text-lg truncate">
            {navItems.find((n) => location.pathname.startsWith(n.href))?.label || 'Панель управления'}
          </h1>
          <div className="ml-auto flex items-center gap-2 text-xs">
            <span className={`w-2 h-2 rounded-full ${dbType === 'supabase' ? 'bg-emerald-500' : 'bg-yellow-500'} pulse-dot`} />
            <span className="text-slate-500 font-mono hidden sm:inline">{dbType === 'supabase' ? 'Supabase' : 'IndexedDB'}</span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
