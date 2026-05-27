import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[rgba(0,210,255,0.15)] to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00d2ff] tracking-[0.3em] uppercase mb-4">
            <div className="w-8 h-px bg-[#00d2ff]" />
            КОНТАКТЫ
            <div className="w-8 h-px bg-[#00d2ff]" />
          </div>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-4">
            СВЯЖИТЕСЬ С НАМИ
          </h2>
          <p className="font-ibm text-[rgba(255,255,255,0.45)] text-lg">
            Команда поддержки отвечает в течение 2 часов в рабочее время
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info cards */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: 'Mail', label: 'Email', value: 'support@voiceai.ru', color: '#00d2ff' },
              { icon: 'MessageSquare', label: 'Telegram', value: '@voiceai_support', color: '#7b2fff' },
              { icon: 'Phone', label: 'Телефон', value: '+7 (800) 555-01-23', color: '#00ff99' },
              { icon: 'Clock', label: 'Часы работы', value: 'Пн–Пт, 9:00–19:00 МСК', color: '#ff6b35' },
            ].map(c => (
              <div
                key={c.label}
                className="flex items-center gap-4 glass rounded-xl p-5 border border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,210,255,0.2)] transition-all duration-300 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${c.color}15`, border: `1px solid ${c.color}25` }}
                >
                  <Icon name={c.icon} size={18} style={{ color: c.color }} />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-[rgba(255,255,255,0.3)] tracking-widest mb-0.5">{c.label}</div>
                  <div className="font-ibm text-sm text-[rgba(255,255,255,0.8)] group-hover:text-white transition-colors">{c.value}</div>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="glass rounded-xl p-5 border border-[rgba(255,255,255,0.06)]">
              <div className="font-mono text-[10px] text-[rgba(255,255,255,0.3)] tracking-widest mb-4">СОЦСЕТИ</div>
              <div className="flex gap-3">
                {[
                  { icon: 'Github', label: 'GitHub' },
                  { icon: 'Twitter', label: 'Twitter' },
                  { icon: 'Youtube', label: 'YouTube' },
                ].map(s => (
                  <button
                    key={s.label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center border border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,210,255,0.3)] hover:bg-[rgba(0,210,255,0.06)] text-[rgba(255,255,255,0.4)] hover:text-[#00d2ff] transition-all duration-200"
                  >
                    <Icon name={s.icon} size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="neon-border glass rounded-2xl p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[rgba(0,255,153,0.1)] border border-[rgba(0,255,153,0.3)] flex items-center justify-center mb-4">
                    <Icon name="Check" size={28} className="text-[#00ff99]" />
                  </div>
                  <h3 className="font-orbitron font-bold text-xl text-white mb-2">Сообщение отправлено!</h3>
                  <p className="font-ibm text-[rgba(255,255,255,0.45)]">Мы ответим в течение 2 часов.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                    className="mt-6 px-6 py-2 border border-[rgba(0,210,255,0.3)] text-[#00d2ff] rounded-lg font-ibm text-sm hover:bg-[rgba(0,210,255,0.06)] transition-all"
                  >
                    Отправить ещё
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-mono text-[10px] text-[rgba(255,255,255,0.35)] tracking-widest mb-2">ИМЯ</label>
                      <input
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        required
                        placeholder="Александр"
                        className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.08)] focus:border-[rgba(0,210,255,0.4)] rounded-xl px-4 py-3 font-ibm text-sm text-white placeholder-[rgba(255,255,255,0.2)] outline-none transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] text-[rgba(255,255,255,0.35)] tracking-widest mb-2">EMAIL</label>
                      <input
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                        type="email"
                        placeholder="alex@company.ru"
                        className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.08)] focus:border-[rgba(0,210,255,0.4)] rounded-xl px-4 py-3 font-ibm text-sm text-white placeholder-[rgba(255,255,255,0.2)] outline-none transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-[rgba(255,255,255,0.35)] tracking-widest mb-2">СООБЩЕНИЕ</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      placeholder="Расскажите о вашем проекте или задайте вопрос..."
                      className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.08)] focus:border-[rgba(0,210,255,0.4)] rounded-xl px-4 py-3 font-ibm text-sm text-white placeholder-[rgba(255,255,255,0.2)] outline-none transition-all duration-200 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#00d2ff] to-[#7b2fff] text-black font-orbitron font-bold text-sm tracking-widest rounded-xl btn-glow flex items-center justify-center gap-2"
                  >
                    <Icon name="Send" size={16} />
                    ОТПРАВИТЬ СООБЩЕНИЕ
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
