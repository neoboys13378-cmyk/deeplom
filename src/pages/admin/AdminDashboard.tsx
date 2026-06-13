import { motion } from 'framer-motion';
import { Database, Users, Shield, TrendingUp, ExternalLink, Server, Cloud } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { content, dbType } = useSite();

  const statsCards = [
    { 
      icon: <Database size={22} />, 
      label: 'Секций контента', 
      color: '#3b82f6', 
      value: Object.keys(content).length 
    },
    { 
      icon: <Users size={22} />, 
      label: 'Услуг', 
      color: '#10b981', 
      value: Array.isArray(content.services) ? content.services.length : 0 
    },
    { 
      icon: <Shield size={22} />, 
      label: 'Проектов', 
      color: '#8b5cf6', 
      value: Array.isArray(content.projects) ? content.projects.length : 0 
    },
    { 
      icon: <TrendingUp size={22} />, 
      label: 'Метрик', 
      color: '#f97316', 
      value: Array.isArray(content.stats) ? content.stats.length : 0 
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-black text-white mb-2">Добро пожаловать!</h2>
        <p className="text-slate-400">Панель управления сайтом Acron Digital</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-slate-900/60 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${card.color}18`, color: card.color }}
              >
                {card.icon}
              </div>
            </div>
            <div className="text-3xl font-black text-white mb-1">{card.value}</div>
            <div className="text-slate-500 text-sm">{card.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        <Link
          to="/admin/dashboard/hero"
          className="bg-gradient-to-br from-blue-900/20 to-blue-950/20 border border-blue-800/20 rounded-2xl p-6 hover:border-blue-700/40 transition-all group"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400">
              <Database size={20} />
            </div>
            <h3 className="text-white font-bold">Редактирование контента</h3>
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Измените тексты, изображения и данные на сайте
          </p>
          <span className="text-blue-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
            Начать редактирование <ExternalLink size={14} />
          </span>
        </Link>

        <div className="bg-gradient-to-br from-emerald-900/20 to-emerald-950/20 border border-emerald-800/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 flex items-center justify-center text-emerald-400">
              {dbType === 'supabase' ? <Cloud size={20} /> : <Server size={20} />}
            </div>
            <h3 className="text-white font-bold">База данных</h3>
          </div>
          <p className="text-slate-400 text-sm mb-4">
            {dbType === 'supabase' 
              ? 'Подключена внешняя БД PostgreSQL (Supabase)'
              : 'Используется локальная БД IndexedDB (браузер)'
            }
          </p>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${dbType === 'supabase' ? 'bg-emerald-400' : 'bg-yellow-400'} pulse-dot`} />
            <span className={`text-xs font-mono ${dbType === 'supabase' ? 'text-emerald-400' : 'text-yellow-400'}`}>
              {dbType === 'supabase' ? 'Supabase PostgreSQL' : 'IndexedDB (локально)'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* DB Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`p-5 rounded-2xl border ${
          dbType === 'supabase' 
            ? 'bg-emerald-900/10 border-emerald-800/20' 
            : 'bg-yellow-900/10 border-yellow-800/20'
        }`}
      >
        <h3 className={`font-bold text-sm mb-3 ${dbType === 'supabase' ? 'text-emerald-400' : 'text-yellow-400'}`}>
          {dbType === 'supabase' ? '🗄️ Supabase PostgreSQL' : '⚠️ Локальная база данных'}
        </h3>
        
        {dbType === 'supabase' ? (
          <div className="font-mono text-sm text-slate-400 space-y-1">
            <div>Тип: <span className="text-emerald-400">PostgreSQL (облако)</span></div>
            <div>Провайдер: <span className="text-emerald-400">Supabase</span></div>
            <div>Статус: <span className="text-emerald-400">● Подключено</span></div>
            <div className="pt-2 text-xs text-slate-500">
              Данные хранятся на внешнем сервере и доступны с любого устройства
            </div>
          </div>
        ) : (
          <div className="font-mono text-sm text-slate-400 space-y-1">
            <div>Тип: <span className="text-yellow-400">IndexedDB (браузер)</span></div>
            <div>Хранилище: <span className="text-yellow-400">Локальное</span></div>
            <div className="pt-2 text-xs text-slate-500">
              Для подключения внешней БД настройте Supabase в файле src/lib/supabase.ts
            </div>
          </div>
        )}
      </motion.div>

      {/* Credentials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 bg-slate-900/40 border border-white/5 rounded-2xl p-5"
      >
        <h3 className="text-slate-400 font-bold text-sm mb-2">📋 Данные для входа</h3>
        <div className="font-mono text-sm text-slate-400 space-y-1">
          <div>Логин: <span className="text-white bg-slate-800 px-2 py-0.5 rounded">admin</span></div>
          <div>Пароль: <span className="text-white bg-slate-800 px-2 py-0.5 rounded">acron2024</span></div>
        </div>
      </motion.div>
    </div>
  );
}
