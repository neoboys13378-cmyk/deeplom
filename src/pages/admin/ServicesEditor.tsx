import { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { Save, Plus, CheckCircle, Trash2 } from 'lucide-react';

interface ServiceItem {
  icon: string; title: string; subtitle: string;
  description: string; tags: string[];
}

export default function ServicesEditor() {
  const { content, updateSection } = useSite();
  const [data, setData] = useState<ServiceItem[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (Array.isArray(content.services)) setData(content.services as ServiceItem[]);
  }, [content.services]);

  const handleSave = async () => {
    await updateSection('services', data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const icons = ['database','shield','network','globe','smartphone','barChart','bot','layers','zap','code','cloud','server','wifi','monitor','lock','chart'];

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div><h2 className="text-xl font-bold text-white">Редактор услуг</h2><p className="text-slate-500 text-sm mt-1">{data.length} услуг · Добавьте или удалите</p></div>
        <button onClick={handleSave} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${saved ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
          {saved ? <CheckCircle size={16} /> : <Save size={16} />} {saved ? 'Сохранено!' : 'Сохранить'}
        </button>
      </div>

      <div className="space-y-4 max-w-3xl">
        {data.map((s, i) => (
          <div key={i} className="p-5 bg-slate-900/60 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-bold text-sm">Услуга #{i + 1}</span>
              <button onClick={() => { const d = [...data]; d.splice(i, 1); setData(d); }} className="text-slate-600 hover:text-red-400 p-1 transition-colors"><Trash2 size={16} /></button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-slate-400 text-xs mb-1 block">Иконка (ключ)</label><select value={s.icon} onChange={(e) => { const d = [...data]; d[i] = { ...d[i], icon: e.target.value }; setData(d); }} className="input-field"><option value="">Выберите...</option>{icons.map(ic => <option key={ic} value={ic}>{ic}</option>)}</select></div>
                <div><label className="text-slate-400 text-xs mb-1 block">Заголовок</label><input value={s.title} onChange={(e) => { const d = [...data]; d[i] = { ...d[i], title: e.target.value }; setData(d); }} className="input-field" /></div>
              </div>
              <div><label className="text-slate-400 text-xs mb-1 block">Подзаголовок</label><input value={s.subtitle} onChange={(e) => { const d = [...data]; d[i] = { ...d[i], subtitle: e.target.value }; setData(d); }} className="input-field" /></div>
              <div><label className="text-slate-400 text-xs mb-1 block">Описание</label><textarea value={s.description} onChange={(e) => { const d = [...data]; d[i] = { ...d[i], description: e.target.value }; setData(d); }} rows={2} className="input-field resize-none" /></div>
              <div><label className="text-slate-400 text-xs mb-1 block">Теги (через запятую)</label><input value={(s.tags || []).join(', ')} onChange={(e) => { const d = [...data]; d[i] = { ...d[i], tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }; setData(d); }} className="input-field" placeholder="1С-Bitrix, Порталы" /></div>
            </div>
          </div>
        ))}
        <button onClick={() => setData([...data, { icon: 'database', title: '', subtitle: '', description: '', tags: [] }])} className="flex items-center gap-2 px-4 py-3 border border-dashed border-white/10 rounded-xl text-slate-500 hover:text-blue-400 hover:border-blue-600/40 transition-all text-sm w-full justify-center"><Plus size={16} /> Добавить услугу</button>
      </div>
    </div>
  );
}
