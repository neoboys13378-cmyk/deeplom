import { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { Save, Plus, CheckCircle, Trash2 } from 'lucide-react';

interface StatItem { value: number; suffix: string; label: string; description: string; }

export default function StatsEditor() {
  const { content, updateSection } = useSite();
  const [data, setData] = useState<StatItem[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (Array.isArray(content.stats)) setData(content.stats as StatItem[]); }, [content.stats]);

  const handleSave = async () => {
    await updateSection('stats', data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div><h2 className="text-xl font-bold text-white">Редактор статистики</h2><p className="text-slate-500 text-sm mt-1">{data.length} метрик</p></div>
        <button onClick={handleSave} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${saved ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
          {saved ? <CheckCircle size={16} /> : <Save size={16} />} {saved ? 'Сохранено!' : 'Сохранить'}
        </button>
      </div>
      <div className="space-y-4 max-w-3xl">
        {data.map((s, i) => (
          <div key={i} className="p-5 bg-slate-900/60 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-bold text-sm">Метрика #{i + 1}</span>
              <button onClick={() => { const d = [...data]; d.splice(i, 1); setData(d); }} className="text-slate-600 hover:text-red-400 p-1"><Trash2 size={16} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-slate-400 text-xs mb-1 block">Число</label><input type="number" value={s.value} onChange={(e) => { const d = [...data]; d[i] = { ...d[i], value: Number(e.target.value) }; setData(d); }} className="input-field" /></div>
              <div><label className="text-slate-400 text-xs mb-1 block">Суффикс</label><input value={s.suffix} onChange={(e) => { const d = [...data]; d[i] = { ...d[i], suffix: e.target.value }; setData(d); }} className="input-field" /></div>
              <div className="col-span-2"><label className="text-slate-400 text-xs mb-1 block">Название</label><input value={s.label} onChange={(e) => { const d = [...data]; d[i] = { ...d[i], label: e.target.value }; setData(d); }} className="input-field" /></div>
              <div className="col-span-2"><label className="text-slate-400 text-xs mb-1 block">Описание</label><input value={s.description} onChange={(e) => { const d = [...data]; d[i] = { ...d[i], description: e.target.value }; setData(d); }} className="input-field" /></div>
            </div>
          </div>
        ))}
        <button onClick={() => setData([...data, { value: 0, suffix: '+', label: '', description: '' }])} className="flex items-center gap-2 px-4 py-3 border border-dashed border-white/10 rounded-xl text-slate-500 hover:text-blue-400 hover:border-blue-600/40 transition-all text-sm w-full justify-center"><Plus size={16} /> Добавить метрику</button>
      </div>
    </div>
  );
}
