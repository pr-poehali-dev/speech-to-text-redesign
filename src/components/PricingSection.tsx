import { useState } from 'react';
import Icon from '@/components/ui/icon';

const PLANS = [
  {
    id: 'free',
    name: 'FREE',
    price: { monthly: 0, yearly: 0 },
    desc: 'Для знакомства с сервисом',
    color: '#ffffff',
    features: [
      '60 минут в месяц',
      'До 5 файлов',
      'Русский и английский',
      'TXT экспорт',
      'Задержка до 2с',
    ],
    missing: ['Диаризация спикеров', 'API доступ', 'SRT/VTT экспорт'],
    cta: 'Начать бесплатно',
    popular: false,
  },
  {
    id: 'pro',
    name: 'PRO',
    price: { monthly: 990, yearly: 7990 },
    desc: 'Для профессионалов',
    color: '#00d2ff',
    features: [
      '600 минут в месяц',
      'Неограниченные файлы',
      '50+ языков',
      'TXT, SRT, VTT, JSON',
      'Задержка < 300мс',
      'Диаризация спикеров',
      'API доступ (100K req/мес)',
    ],
    missing: ['Приоритетная поддержка'],
    cta: 'Подключить PRO',
    popular: true,
  },
  {
    id: 'business',
    name: 'BUSINESS',
    price: { monthly: 4990, yearly: 39990 },
    desc: 'Для команд и компаний',
    color: '#7b2fff',
    features: [
      'Безлимитные минуты',
      'Неограниченные файлы',
      '50+ языков',
      'Все форматы экспорта',
      'Задержка < 150мс',
      'Диаризация спикеров',
      'API без лимитов',
      'Приоритетная поддержка 24/7',
    ],
    missing: [],
    cta: 'Связаться с нами',
    popular: false,
  },
];

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#00d2ff] opacity-[0.02] blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00d2ff] tracking-[0.3em] uppercase mb-4">
            <div className="w-8 h-px bg-[#00d2ff]" />
            ТАРИФЫ
            <div className="w-8 h-px bg-[#00d2ff]" />
          </div>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-4">
            ВЫБЕРИ ПЛАН
          </h2>
          <p className="font-ibm text-[rgba(255,255,255,0.45)] text-lg mb-8">
            Начни бесплатно. Расти без ограничений.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 glass border border-[rgba(255,255,255,0.08)] rounded-xl p-1.5">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-lg text-sm font-orbitron font-bold transition-all duration-300 ${
                !yearly
                  ? 'bg-[rgba(0,210,255,0.15)] text-[#00d2ff] border border-[rgba(0,210,255,0.3)]'
                  : 'text-[rgba(255,255,255,0.4)]'
              }`}
            >
              МЕСЯЦ
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-lg text-sm font-orbitron font-bold transition-all duration-300 flex items-center gap-2 ${
                yearly
                  ? 'bg-[rgba(0,210,255,0.15)] text-[#00d2ff] border border-[rgba(0,210,255,0.3)]'
                  : 'text-[rgba(255,255,255,0.4)]'
              }`}
            >
              ГОД
              <span className="text-[10px] bg-[#00ff99] text-black px-1.5 py-0.5 rounded font-mono">-30%</span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map(plan => (
            <div
              key={plan.id}
              className={`relative glass rounded-2xl p-7 border transition-all duration-500 ${
                plan.popular
                  ? 'border-[rgba(0,210,255,0.4)] glow-cyan scale-105'
                  : 'border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1.5 bg-gradient-to-r from-[#00d2ff] to-[#7b2fff] rounded-full text-black text-xs font-orbitron font-bold tracking-widest">
                    ПОПУЛЯРНЫЙ
                  </div>
                </div>
              )}

              {/* Plan name */}
              <div className="mb-6">
                <div
                  className="text-xs font-mono tracking-[0.3em] mb-2"
                  style={{ color: plan.color }}
                >
                  {plan.name}
                </div>
                <div className="flex items-end gap-2 mb-1">
                  <span className="font-orbitron font-black text-4xl text-white">
                    {yearly
                      ? plan.price.yearly === 0 ? '0' : `${plan.price.yearly.toLocaleString('ru')}`
                      : plan.price.monthly === 0 ? '0' : `${plan.price.monthly.toLocaleString('ru')}`}
                  </span>
                  {(yearly ? plan.price.yearly : plan.price.monthly) > 0 && (
                    <span className="font-ibm text-[rgba(255,255,255,0.4)] text-sm mb-1">
                      ₽/{yearly ? 'год' : 'мес'}
                    </span>
                  )}
                  {(yearly ? plan.price.yearly : plan.price.monthly) === 0 && (
                    <span className="font-ibm text-[rgba(255,255,255,0.4)] text-sm mb-1">₽</span>
                  )}
                </div>
                <p className="font-ibm text-sm text-[rgba(255,255,255,0.4)]">{plan.desc}</p>
              </div>

              {/* CTA */}
              <button
                className={`w-full py-3 rounded-xl font-orbitron font-bold text-sm tracking-wider mb-6 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#00d2ff] to-[#7b2fff] text-black btn-glow'
                    : 'border border-[rgba(255,255,255,0.15)] text-white hover:bg-[rgba(255,255,255,0.05)]'
                }`}
              >
                {plan.cta}
              </button>

              {/* Features */}
              <div className="space-y-3">
                {plan.features.map(f => (
                  <div key={f} className="flex items-start gap-3">
                    <Icon name="Check" size={14} className="mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                    <span className="font-ibm text-sm text-[rgba(255,255,255,0.7)]">{f}</span>
                  </div>
                ))}
                {plan.missing.map(f => (
                  <div key={f} className="flex items-start gap-3 opacity-35">
                    <Icon name="X" size={14} className="mt-0.5 flex-shrink-0 text-[rgba(255,255,255,0.3)]" />
                    <span className="font-ibm text-sm text-[rgba(255,255,255,0.4)] line-through">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-10 font-ibm text-sm text-[rgba(255,255,255,0.25)]">
          Все цены указаны без НДС · Отмена подписки в любое время · Оплата картой или по счёту
        </p>
      </div>
    </section>
  );
}
