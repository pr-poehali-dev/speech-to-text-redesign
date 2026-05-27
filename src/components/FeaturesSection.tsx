import Icon from '@/components/ui/icon';

const FEATURES = [
  {
    icon: 'Zap',
    title: 'Реальное время',
    desc: 'Распознавание с задержкой менее 300 мс. Стримминг результатов по мере произнесения.',
    color: '#00d2ff',
    tag: 'СКОРОСТЬ',
  },
  {
    icon: 'Globe',
    title: '50+ языков',
    desc: 'Русский, английский, немецкий, китайский и ещё 46 языков с учётом диалектов.',
    color: '#7b2fff',
    tag: 'МУЛЬТИЯЗЫЧНОСТЬ',
  },
  {
    icon: 'ShieldCheck',
    title: 'Безопасность',
    desc: 'Шифрование AES-256, данные хранятся на серверах в России, соответствие 152-ФЗ.',
    color: '#00ff99',
    tag: 'ЗАЩИТА',
  },
  {
    icon: 'FileText',
    title: 'Форматы вывода',
    desc: 'TXT, SRT, VTT, JSON с временными метками. Экспорт в один клик.',
    color: '#ff6b35',
    tag: 'ЭКСПОРТ',
  },
  {
    icon: 'Users',
    title: 'Диаризация',
    desc: 'Автоматическое разделение по спикерам. Идеально для совещаний и интервью.',
    color: '#ff2d7b',
    tag: 'УМНЫЙ',
  },
  {
    icon: 'Code2',
    title: 'REST API',
    desc: 'Простая интеграция за 5 минут. SDK для Python, JS, Go. WebSocket стриминг.',
    color: '#00d2ff',
    tag: 'РАЗРАБОТКА',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      {/* Glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7b2fff] opacity-[0.03] blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#7b2fff] tracking-[0.3em] uppercase mb-4">
            <div className="w-8 h-px bg-[#7b2fff]" />
            ВОЗМОЖНОСТИ
            <div className="w-8 h-px bg-[#7b2fff]" />
          </div>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-4">
            ВСЁ ЧТО НУЖНО
          </h2>
          <p className="font-ibm text-[rgba(255,255,255,0.45)] text-lg max-w-xl mx-auto">
            Мощный набор инструментов для работы с речью — от простой транскрибации до сложных интеграций
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="group relative glass rounded-2xl p-6 border border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,210,255,0.2)] transition-all duration-500 cursor-default overflow-hidden"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Hover glow background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(circle at 30% 30%, ${f.color}08 0%, transparent 70%)` }}
              />

              {/* Tag */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className="text-[10px] font-mono tracking-[0.2em] px-2 py-1 rounded border"
                  style={{ color: f.color, borderColor: `${f.color}30`, background: `${f.color}10` }}
                >
                  {f.tag}
                </span>
                <div className="w-2 h-2 rounded-full opacity-40 group-hover:opacity-100 transition-opacity" style={{ background: f.color }} />
              </div>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${f.color}15`, border: `1px solid ${f.color}25` }}
              >
                <Icon name={f.icon} fallback="Star" size={22} style={{ color: f.color }} />
              </div>

              {/* Text */}
              <h3 className="font-orbitron font-bold text-lg text-white mb-3 group-hover:text-[#00d2ff] transition-colors duration-300">
                {f.title}
              </h3>
              <p className="font-ibm text-sm text-[rgba(255,255,255,0.45)] leading-relaxed">
                {f.desc}
              </p>

              {/* Bottom line */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${f.color}40, transparent)` }}
              />
            </div>
          ))}
        </div>

        {/* Bottom stats bar */}
        <div className="mt-20 neon-border glass rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: '10M+', label: 'Минут транскрибировано' },
            { val: '50K+', label: 'Пользователей' },
            { val: '99.2%', label: 'Средняя точность' },
            { val: '< 300мс', label: 'Задержка в режиме реального времени' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-orbitron font-black text-3xl gradient-text-cyan mb-1">{s.val}</div>
              <div className="font-ibm text-xs text-[rgba(255,255,255,0.35)] leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}