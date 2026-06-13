import { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { Save, Plus, CheckCircle, Trash2 } from 'lucide-react';

interface ProjectItem {
  year: string; category: string; title: string; description: string;
  results: string[]; badge: string; badgeColor: string; hot: boolean;
}

export default function ProjectsEditor() {
  const { content, updateSection } = useSite();
  const [data, setData] = useState<ProjectItem[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (Array.isArray(content.projects)) setData(content.projects as ProjectItem[]); }, [content.projects]);

  const handleSave = async () => {
    await updateSection('projects', data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div><h2 className="text-xl font-bold text-white">Редактор проектов</h2><p className="text-slate-500 text-sm mt-1">{data.length} проектов</p></div>
        <button onClick={handleSave} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${saved ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
          {saved ? <CheckCircle size={16} /> : <Save size={16} />} {saved ? 'Сохранено!' : 'Сохранить'}
        </button>
      </div>
      <div className="space-y-4 max-w-3xl">
        {data.map((p, i) => (
          <div key={i} className="p-5 bg-slate-900/60 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-bold text-sm">Проект #{i + 1}</span>
              <button onClick={() => { const d = [...data]; d.splice(i, 1); setData(d); }} className="text-slate-600 hover:text-red-400 p-1"><Trash2 size={16} /></button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div><label className="text-slate-400 text-xs mb-1 block">Год</label><input value={p.year} onChange={(e) => { const d = [...data]; d[i] = { ...d[i], year: e.target.value }; setData(d); }} className="input-field" /></div>
                <div><label className="text-slate-400 text-xs mb-1 block">Категория</label><input value={p.category} onChange={(e) => { const d = [...data]; d[i] = { ...d[i], category: e.target.value }; setData(d); }} className="input-field" /></div>
                <div><label className="text-slate-400 text-xs mb-1 block">Бейдж</label><input value={p.badge} onChange={(e) => { const d = [...data]; d[i] = { ...d[i], badge: e.target.value }; setData(d); }} className="input-field" /></div>
              </div>
              <div><label className="text-slate-400 text-xs mb-1 block">Название</label><input value={p.title} onChange={(e) => { const d = [...data]; d[i] = { ...d[i], title: e.target.value }; setData(d); }} className="input-field" /></div>
              <div><label className="text-slate-400 text-xs mb-1 block">Описание</label><textarea value={p.description} onChange={(e) => { const d = [...data]; d[i] = { ...d[i], description: e.target.value }; setData(d); }} rows={2} className="input-field resize-none" /></div>
              <div><label className="text-slate-400 text-xs mb-1 block">Результаты (через перевод строки)</label><textarea value={(p.results || []).join('\n')} onChange={(e) => { const d = [...data]; d[i] = { ...d[i], results: e.target.value.split('\n').filter(Boolean) }; setData(d); }} rows={3} className="input-field resize-none font-mono text-xs" /></div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer"><input type="checkbox" checked={p.hot} onChange={(e) => { const d = [...data]; d[i] = { ...d[i], hot: e.target.checked }; setData(d); }} className="rounded accent-blue-600" /> Отметить NEW</label>
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => setData([...data, { year: '2024', category: '', title: '', description: '', results: [], badge: '', badgeColor: '#3b82f6', hot: false }])} className="flex items-center gap-2 px-4 py-3 border border-dashed border-white/10 rounded-xl text-slate-500 hover:text-blue-400 hover:border-blue-600/40 transition-all text-sm w-full justify-center"><Plus size={16} /> Добавить проект</button>
      </div>
    </div>
  );
}
