import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, AlertCircle, Eye } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useSite();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(username, password);

    if (!result.success) {
      setError(result.error || 'Ошибка входа');
      setLoading(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg relative overflow-hidden px-4 py-6">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="absolute top-1/4 left-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-48 sm:w-64 h-48 sm:h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-600 flex items-center justify-center glow-blue">
              <Lock size={20} className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
            ACRON <span className="gradient-text">Admin</span>
          </h1>
          <p className="text-slate-500 text-sm">Панель управления сайтом</p>
        </div>

        <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-5 sm:p-8 backdrop-blur-sm">
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-900/20 border border-red-800/30 text-red-400 text-sm mb-5 sm:mb-6">
              <AlertCircle size={16} className="flex-shrink-0" />{error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-slate-400 text-sm mb-2 font-medium">Логин</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"><Mail size={16} /></div>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" className="w-full pl-11 pr-4 py-3 bg-slate-800/60 border border-white/5 focus:border-blue-600/60 rounded-xl text-white placeholder:text-slate-600 outline-none transition-all text-sm" autoFocus />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 text-sm mb-2 font-medium">Пароль</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"><Lock size={16} /></div>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-11 pr-12 py-3 bg-slate-800/60 border border-white/5 focus:border-blue-600/60 rounded-xl text-white placeholder:text-slate-600 outline-none transition-all text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"><Eye size={16} /></button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/30 text-sm flex items-center justify-center gap-2 min-h-[48px]">
              {loading ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> : null}
              {loading ? 'Вход...' : 'Войти в панель управления'}
            </button>
          </form>

          <div className="mt-5 sm:mt-6 pt-5 border-t border-white/5 text-center">
            <a href="#/" className="text-slate-600 hover:text-slate-400 text-sm transition-colors">← Вернуться на сайт</a>
          </div>
        </div>

        <p className="text-center text-slate-700 text-xs mt-5 sm:mt-6 font-mono">Попробуйте: admin / acron2024</p>
      </motion.div>
    </div>
  );
}
