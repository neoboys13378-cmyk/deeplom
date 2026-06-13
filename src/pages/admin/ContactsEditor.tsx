import { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { Save, CheckCircle } from 'lucide-react';

export default function ContactsEditor() {
  const { content, updateSection } = useSite();
  const [data, setData] = useState({ address: '', phone: '', email: '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (content.contacts) {
      const c = content.contacts as Record<string, string>;
      setData({ address: c.address || '', phone: c.phone || '', email: c.email || '' });
    }
  }, [content.contacts]);

  const handleSave = async () => {
    await updateSection('contacts', data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div><h2 className="text-xl font-bold text-white">Редактор контактов</h2><p className="text-slate-500 text-sm mt-1">Настройте контактную информацию</p></div>
        <button onClick={handleSave} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${saved ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
          {saved ? <CheckCircle size={16} /> : <Save size={16} />} {saved ? 'Сохранено!' : 'Сохранить'}
        </button>
      </div>
      <div className="space-y-6 max-w-xl">
        <Field label="Адрес"><input value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} className="input-field" /></Field>
        <Field label="Телефон"><input value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} className="input-field" /></Field>
        <Field label="E-mail"><input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="input-field" /></Field>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (<div><label className="text-white text-sm font-medium mb-1.5 block">{label}</label>{children}</div>);
}
