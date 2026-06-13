import { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { Save, Plus, X, CheckCircle } from 'lucide-react';

interface Feature { icon: string; title: string; desc: string; }

export default function AboutEditor() {
  const { content, updateSection } = useSite();
  const [data, setData] = useState({
    title_line1: '', title_line2: '', title_line3: '',
    paragraph1: '', paragraph2: '',
    features: [] as Feature[],
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (content.about) {
      const a = content.about as Record<string, unknown>;
      setData({
        title_line1: (a.title_line1 as string) || '',
        title_line2: (a.title_line2 as string) || '',
        title_line3: (a.title_line3 as string) || '',
        paragraph1: (a.paragraph1 as string) || '',
        paragraph2: (a.paragraph2 as string) || '',
        features: Array.isArray(a.features) ? a.features as Feature[] : [],
      });
    }
  }, [content.about]);

  const handleSave = async () => {
    await updateSection('about', data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Редактор «О компании»</h2>
          <p className="text-slate-500 text-sm mt-1">Измените тексты и карточки раздела «О компании»</p>
        </div>
        <button onClick={handleSave} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${saved ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
          {saved ? <CheckCircle size={16} /> : <Save size={16} />} {saved ? 'Сохранено!' : 'Сохранить'}
        </button>
      </div>
      <div className="space-y-6 max-w-3xl">
        <Field label="Заголовок (строка 1)"><input value={data.title_line1} onChange={(e) => setData({ ...data, title_line1: e.target.value })} className="input-field" /></Field>
        <Field label="Заголовок (строка 2 — градиент)"><input value={data.title_line2} onChange={(e) => setData({ ...data, title_line2: e.target.value })} className="input-field" /></Field>
        <Field label="Заголовок (строка 3)"><input value={data.title_line3} onChange={(e) => setData({ ...data, title_line3: e.target.value })} className="input-field" /></Field>
        <Field label="Первый абзац" hint="HTML поддерживается (тэги strong, em)"><textarea value={data.paragraph1} onChange={(e) => setData({ ...data, paragraph1: e.target.value })} rows={3} className="input-field resize-none" /></Field>
        <Field label="Второй абзац"><textarea value={data.paragraph2} onChange={(e) => setData({ ...data, paragraph2: e.target.value })} rows={3} className="input-field resize-none" /></Field>

        <Field label="Карточки преимуществ">
          <div className="space-y-3">
            {data.features.map((f, i) => (
              <div key={i} className="p-4 bg-slate-800/40 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center gap-2">
                  <input value={f.title} onChange={(e) => { const nf = [...data.features]; nf[i] = { ...nf[i], title: e.target.value }; setData({ ...data, features: nf }); }} className="input-field flex-1" placeholder="Название" />
                  <button onClick={() => { const nf = [...data.features]; nf.splice(i, 1); setData({ ...data, features: nf }); }} className="text-slate-600 hover:text-red-400 p-1"><X size={16} /></button>
                </div>
                <input value={f.desc} onChange={(e) => { const nf = [...data.features]; nf[i] = { ...nf[i], desc: e.target.value }; setData({ ...data, features: nf }); }} className="input-field" placeholder="Описание" />
              </div>
            ))}
            <button onClick={() => setData({ ...data, features: [...data.features, { icon: 'building', title: '', desc: '' }] })} className="flex items-center gap-2 text-blue-400 text-sm hover:text-blue-300"><Plus size={14} /> Добавить карточку</button>
          </div>
        </Field>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (<div><div className="text-white text-sm font-medium mb-1.5">{label} {hint && <span className="text-slate-600 text-xs">({hint})</span>}</div>{children}</div>);
}
