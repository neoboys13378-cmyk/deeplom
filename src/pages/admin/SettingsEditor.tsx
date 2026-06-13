import { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { Save, CheckCircle, RotateCcw, AlertTriangle } from 'lucide-react';
import { resetToDefaults } from '../../db/database';

export default function SettingsEditor() {
  const { content, updateSection, refreshContent } = useSite();
  const [data, setData] = useState({ siteName: '', siteDescription: '' });
  const [saved, setSaved] = useState(false);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    if (content.settings) {
      const s = content.settings as Record<string, string>;
      setData({ siteName: s.siteName || '', siteDescription: s.siteDescription || '' });
    }
  }, [content.settings]);

  const handleSave = async () => {
    await updateSection('settings', data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = async () => {
    if (!confirm('Восстановить все данные сайта по умолчанию? Все изменения будут потеряны.')) return;
    setResetting(true);
    await resetToDefaults();
    await refreshContent();
    setResetting(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div><h2 className="text-xl font-bold text-white">Настройки сайта</h2><p className="text-slate-500 text-sm mt-1">Общие параметры и управление БД</p></div>
      </div>

      <div className="space-y-6 max-w-xl">
        <div className="p-5 bg-slate-900/60 rounded-2xl border border-white/5 space-y-4">
          <h3 className="text-white font-bold">Основные</h3>
          <div><label className="text-slate-400 text-xs mb-1 block">Название сайта</label><input value={data.siteName} onChange={(e) => setData({ ...data, siteName: e.target.value })} className="input-field" /></div>
          <div><label className="text-slate-400 text-xs mb-1 block">Описание</label><input value={data.siteDescription} onChange={(e) => setData({ ...data, siteDescription: e.target.value })} className="input-field" /></div>
          <button onClick={handleSave} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${saved ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
            {saved ? <CheckCircle size={16} /> : <Save size={16} />} {saved ? 'Сохранено!' : 'Сохранить'}
          </button>
        </div>

        <div className="p-5 bg-slate-900/60 rounded-2xl border border-white/5 space-y-4">
          <h3 className="text-white font-bold">База данных</h3>
          <div className="bg-slate-800/40 rounded-xl p-4 space-y-2 font-mono text-xs text-slate-400">
            <div>Тип: <span className="text-blue-400">IndexedDB (NoSQL)</span></div>
            <div>Имя: <span className="text-blue-400">acron-digital-db</span></div>
            <div>Версия: <span className="text-blue-400">1</span></div>
            <div>Секции: <span className="text-blue-400">{Object.keys(content).length}</span></div>
            <div>Хранилище: <span className="text-emerald-400">● Активно</span></div>
          </div>
        </div>

        <div className="p-5 bg-red-900/10 rounded-2xl border border-red-800/20 space-y-4">
          <h3 className="text-red-400 font-bold flex items-center gap-2"><AlertTriangle size={18} /> Опасная зона</h3>
          <p className="text-slate-400 text-sm">Восстановить все данные сайта к исходным значениям. Это действие нельзя отменить.</p>
          <button onClick={handleReset} disabled={resetting} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-red-600/20 border border-red-600/40 text-red-400 hover:bg-red-600/30 transition-all disabled:opacity-50">
            {resetting ? 'Восстановление...' : <><RotateCcw size={16} /> Сбросить к оригиналу</>}
          </button>
        </div>
      </div>
    </div>
  );
}
