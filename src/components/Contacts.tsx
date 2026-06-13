import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Mail, Phone, ExternalLink, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { submitContactRequest, isSupabaseConfigured } from '../lib/supabase';

export default function Contacts() {
  const { content, loading } = useSite();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (loading) return null;

  const contacts = (content.contacts as Record<string, string>) || {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!form.name || !form.email) {
      setError('Заполните обязательные поля');
      return;
    }

    setSubmitting(true);

    if (isSupabaseConfigured) {
      const success = await submitContactRequest({
        name: form.name,
        company: form.company || null,
        email: form.email,
        message: form.message || null,
      });
      
      if (success) {
        setSubmitted(true);
        setForm({ name: '', company: '', email: '', message: '' });
      } else {
        setError('Ошибка отправки. Попробуйте позже.');
      }
    } else {
      await new Promise(r => setTimeout(r, 1000));
      setSubmitted(true);
      setForm({ name: '', company: '', email: '', message: '' });
    }

    setSubmitting(false);
  };

  return (
    <section id="contacts" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(37,99,235,0.08) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 grid-overlay opacity-20" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px divider-glow" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={ref}>
        <div className="text-center mb-10 sm:mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-800/40 bg-blue-950/20 text-blue-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span className="mono">// контакты</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-5">
            Свяжитесь <span className="gradient-text">с нами</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto px-2">
            Готовы обсудить ваш проект
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="bg-slate-900/60 border border-white/5 rounded-2xl p-5 sm:p-8">
            <h3 className="text-white font-bold text-lg sm:text-xl mb-5 sm:mb-6">Написать нам</h3>

            {submitted ? (
              <div className="text-center py-6 sm:py-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-600/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-emerald-400" />
                </div>
                <h4 className="text-white font-bold text-lg mb-2">Заявка отправлена!</h4>
                <p className="text-slate-400 text-sm mb-4">Мы свяжемся с вами в ближайшее время</p>
                <button onClick={() => setSubmitted(false)} className="text-blue-400 text-sm hover:text-blue-300 transition-colors">Отправить ещё одну заявку</button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {error && (
                  <div className="px-4 py-3 rounded-xl bg-red-900/20 border border-red-800/30 text-red-400 text-sm">{error}</div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Имя *</label>
                    <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Иван" className="w-full px-4 py-3 bg-slate-800/60 border border-white/5 focus:border-blue-600/60 rounded-xl text-white placeholder:text-slate-600 outline-none transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Компания</label>
                    <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="ООО «..." className="w-full px-4 py-3 bg-slate-800/60 border border-white/5 focus:border-blue-600/60 rounded-xl text-white placeholder:text-slate-600 outline-none transition-all text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">E-mail *</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="ivan@company.ru" className="w-full px-4 py-3 bg-slate-800/60 border border-white/5 focus:border-blue-600/60 rounded-xl text-white placeholder:text-slate-600 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Сообщение</label>
                  <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Расскажите о вашей задаче..." className="w-full px-4 py-3 bg-slate-800/60 border border-white/5 focus:border-blue-600/60 rounded-xl text-white placeholder:text-slate-600 outline-none transition-all text-sm resize-none" />
                </div>
                <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/30 text-sm min-h-[48px]">
                  {submitting ? <><Loader2 size={16} className="animate-spin" /> Отправка...</> : <>Отправить заявку <ChevronRight size={16} /></>}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col gap-4 sm:gap-6">
            <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-5 sm:p-8 space-y-5 sm:space-y-6">
              <h3 className="text-white font-bold text-lg sm:text-xl">Контактная информация</h3>
              
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 sm:gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-blue-600/15 border border-blue-600/20 flex items-center justify-center flex-shrink-0 text-blue-400 mt-0.5"><MapPin size={20} /></div>
                <div>
                  <div className="text-slate-500 text-xs mb-1">Адрес</div>
                  <div className="text-white font-medium text-sm group-hover:text-blue-300 transition-colors">{contacts.address || 'г. Великий Новгород, 173012'}</div>
                </div>
              </a>
              
              <a href={`tel:${contacts.phone || '+78162996558'}`} className="flex items-start gap-3 sm:gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-blue-600/15 border border-blue-600/20 flex items-center justify-center flex-shrink-0 text-blue-400 mt-0.5"><Phone size={20} /></div>
                <div>
                  <div className="text-slate-500 text-xs mb-1">Телефон</div>
                  <div className="text-white font-medium text-sm group-hover:text-blue-300 transition-colors">{contacts.phone || '+7 (8162) 99-65-58'}</div>
                </div>
              </a>
              
              <a href={`mailto:${contacts.email || 'info@acron.ru'}`} className="flex items-start gap-3 sm:gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-blue-600/15 border border-blue-600/20 flex items-center justify-center flex-shrink-0 text-blue-400 mt-0.5"><Mail size={20} /></div>
                <div>
                  <div className="text-slate-500 text-xs mb-1">E-mail</div>
                  <div className="text-white font-medium text-sm group-hover:text-blue-300 transition-colors">{contacts.email || 'info@acron.ru'}</div>
                </div>
              </a>
            </div>

            <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-5 sm:p-8">
              <h3 className="text-white font-bold text-lg sm:text-xl mb-4 sm:mb-5">Полезные ссылки</h3>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { label: 'Сайт группы Акрон', href: 'https://www.acron.ru' },
                  { label: 'Пресс-центр', href: 'https://www.acron.ru/press-center/' }
                ].map((l, i) => (
                  <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-3 rounded-xl border border-white/5 hover:border-blue-800/40 hover:bg-blue-950/20 transition-all group">
                    <span className="text-slate-400 group-hover:text-white text-sm transition-colors">{l.label}</span>
                    <ExternalLink size={14} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
