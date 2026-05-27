import Icon from '@/components/ui/icon';

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[rgba(0,210,255,0.08)] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[rgba(0,210,255,0.15)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00d2ff20] to-[#7b2fff20] border border-[rgba(0,210,255,0.4)] flex items-center justify-center">
                <Icon name="Mic" size={18} className="text-[#00d2ff]" />
              </div>
              <span className="font-orbitron font-bold text-lg tracking-wider gradient-text-cyan">
                VOICE<span className="text-[#7b2fff]">AI</span>
              </span>
            </div>
            <p className="font-ibm text-sm text-[rgba(255,255,255,0.35)] leading-relaxed max-w-xs mb-6">
              Распознавание речи нового поколения на базе нейросети. Точность 99%, задержка 300мс, 50+ языков.
            </p>
            <div className="flex items-center gap-2 px-3 py-2 bg-[rgba(0,255,153,0.06)] border border-[rgba(0,255,153,0.2)] rounded-lg w-fit">
              <div className="w-2 h-2 rounded-full bg-[#00ff99] animate-pulse" />
              <span className="font-mono text-xs text-[#00ff99] tracking-wider">ВСЕ СИСТЕМЫ РАБОТАЮТ</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="font-mono text-[10px] text-[rgba(255,255,255,0.25)] tracking-[0.25em] mb-4">НАВИГАЦИЯ</div>
            <ul className="space-y-3">
              {[
                { label: 'Демо', href: '#demo' },
                { label: 'Функции', href: '#features' },
                { label: 'Цены', href: '#pricing' },
                { label: 'API', href: '#api' },
                { label: 'Контакты', href: '#contact' },
              ].map(l => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="font-ibm text-sm text-[rgba(255,255,255,0.4)] hover:text-[#00d2ff] transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="font-mono text-[10px] text-[rgba(255,255,255,0.25)] tracking-[0.25em] mb-4">ДОКУМЕНТЫ</div>
            <ul className="space-y-3">
              {[
                'Условия использования',
                'Политика конфиденциальности',
                'Обработка данных',
                'SLA',
                'Cookie Policy',
              ].map(l => (
                <li key={l}>
                  <button className="font-ibm text-sm text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.7)] transition-colors text-left">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[rgba(255,255,255,0.05)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-[rgba(255,255,255,0.2)]">
            © 2024 VoiceAI · ООО «ВойсАИ» · ИНН 7700000000
          </p>
          <div className="flex items-center gap-1 font-mono text-xs text-[rgba(255,255,255,0.15)]">
            <Icon name="Server" size={11} />
            <span>Серверы в России · GDPR · 152-ФЗ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
