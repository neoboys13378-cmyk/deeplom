import { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { Save, Plus, X, AlertCircle, CheckCircle } from 'lucide-react';

interface StatItem { value: string; label: string; }

export default function HeroEditor() {
  const { content, updateSection } = useSite();
  const [data, setData] = useState({
    badge: '',
    title_line1: '',
    title_line2: '',
    typing_words: [''],
    subtitle: '',
    stats: [] as StatItem[],
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (content.hero) {
      const hero = content.hero as Record<string, unknown>;
      setData({
        badge: (hero.badge as string) || '',
        title_line1: (hero.title_line1 as string) || '',
        title_line2: (hero.title_line2 as string) || '',
        typing_words: Array.isArray(hero.typing_words) ? hero.typing_words.map(String) : [''],
        subtitle: (hero.subtitle as string) || '',
        stats: Array.isArray(hero.stats) ? hero.stats as StatItem[] : [{ value: '', label: '' }],
      });
    }
  }, [content.hero]);

  const handleSave = async () => {
    await updateSection('hero', data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Редактор главного экрана</h2>
          <p className="text-slate-500 text-sm mt-1">Настройте заголовок, описание и статистику Hero-секции</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
            saved ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-lg hover:shadow-blue-600/30'
          }`}
        >
          {saved ? <CheckCircle size={16} /> : <Save size={16} />}
          {saved ? 'Сохранено!' : 'Сохранить'}
        </button>
      </div>

      <div className="space-y-6 max-w-3xl">
        <Field label="Верхний бейдж">
          <input value={data.badge} onChange={(e) => setData({ ...data, badge: e.target.value })} className="input-field" placeholder="Дочерняя компания ПАО «Акрон»" />
        </Field>

        <Field label="Заголовок (строка 1)">
          <input value={data.title_line1} onChange={(e) => setData({ ...data, title_line1: e.target.value })} className="input-field" placeholder="Поставщик решений" />
        </Field>

        <Field label="Заголовок (строка 2)">
          <input value={data.title_line2} onChange={(e) => setData({ ...data, title_line2: e.target.value })} className="input-field" placeholder="в области" />
        </Field>

        <Field label="Анимированные слова" hint="Слова, которые печатаются по очереди">
          <div className="space-y-2">
            {data.typing_words.map((word, i) => (
              <div key={i} className="flex items-center gap-2">
                <input value={word} onChange={(e) => {
                  const nw = [...data.typing_words]; nw[i] = e.target.value; setData({ ...data, typing_words: nw });
                }} className="input-field flex-1" placeholder="цифровой трансформации" />
                {data.typing_words.length > 1 && (
                  <button onClick={() => { const nw = [...data.typing_words]; nw.splice(i, 1); setData({ ...data, typing_words: nw }); }} className="text-slate-600 hover:text-red-400 p-1 transition-colors"><X size={16} /></button>
                )}
              </div>
            ))}
            <button onClick={() => setData({ ...data, typing_words: [...data.typing_words, ''] })} className="flex items-center gap-2 text-blue-400 text-sm hover:text-blue-300"><Plus size={14} /> Добавить слово</button>
          </div>
        </Field>

        <Field label="Подзаголовок" hint="Описание компании под заголовком">
          <textarea value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} rows={3} className="input-field resize-none" placeholder="Описание компании..." />
        </Field>

        <Field label="Статистика (3 карточки)">
          <div className="space-y-3">
            {data.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-2">
                <input value={stat.value} onChange={(e) => {
                  const ns = [...data.stats]; ns[i] = { ...ns[i], value: e.target.value }; setData({ ...data, stats: ns });
                }} className="input-field w-28" placeholder="4 600+" />
                <input value={stat.label} onChange={(e) => {
                  const ns = [...data.stats]; ns[i] = { ...ns[i], label: e.target.value }; setData({ ...data, stats: ns });
                }} className="input-field flex-1" placeholder="Пользователей ERP" />
                {data.stats.length > 1 && (
                  <button onClick={() => { const ns = [...data.stats]; ns.splice(i, 1); setData({ ...data, stats: ns }); }} className="text-slate-600 hover:text-red-400 p-1"><X size={16} /></button>
                )}
              </div>
            ))}
            <button onClick={() => setData({ ...data, stats: [...data.stats, { value: '', label: '' }] })} className="flex items-center gap-2 text-blue-400 text-sm hover:text-blue-300"><Plus size={14} /> Добавить метрику</button>
          </div>
        </Field>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <label className="text-white text-sm font-medium">{label}</label>
        {hint && <div className="group relative"><AlertCircle size={14} className="text-slate-600 cursor-help" /><div className="absolute bottom-full left-0 mb-2 px-3 py-1.5 bg-slate-800 text-slate-300 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">{hint}</div></div>}
      </div>
      {children}
    </div>
  );
}
