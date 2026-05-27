import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

interface HeroProps {
  onAuthOpen: (mode: 'login' | 'register') => void;
}

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 8,
  size: 1 + Math.random() * 3,
}));

const TYPED_TEXTS = [
  'Конвертируй речь в текст мгновенно...',
  'Транскрибируй встречи и интервью...',
  'Субтитры для видео за секунды...',
  'API для ваших приложений...',
];

export default function HeroSection({ onAuthOpen }: HeroProps) {
  const [typedIndex, setTypedIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const current = TYPED_TEXTS[typedIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setTypedIndex((typedIndex + 1) % TYPED_TEXTS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, typedIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-[#00d2ff] opacity-0"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `float-particle ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Scanning line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="scan-line absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,210,255,0.15)] to-transparent"
          style={{ top: 0 }}
        />
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00d2ff] opacity-[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#7b2fff] opacity-[0.05] blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(0,210,255,0.25)] glass mb-8 animate-fade-in-up">
          <div className="w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse" />
          <span className="text-xs font-ibm tracking-[0.2em] text-[rgba(0,210,255,0.8)] uppercase">
            Нейросеть нового поколения
          </span>
        </div>

        {/* Heading */}
        <h1
          className="font-orbitron font-black text-5xl md:text-7xl leading-tight mb-6"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="block text-white">РАСПОЗНАВАНИЕ</span>
          <span className="block gradient-text glow-cyan-text">РЕЧИ</span>
          <span className="block text-white text-4xl md:text-5xl">НОВОГО ПОКОЛЕНИЯ</span>
        </h1>

        {/* Subtitle typed */}
        <div className="h-8 mb-10 flex items-center justify-center">
          <p className="text-lg font-ibm text-[rgba(255,255,255,0.5)] tracking-wide">
            {displayed}
            <span className="cursor text-[#00d2ff]">|</span>
          </p>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {[
            { value: '99%', label: 'Точность' },
            { value: '0.3с', label: 'Задержка' },
            { value: '50+', label: 'Языков' },
            { value: '24/7', label: 'Доступность' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-orbitron font-bold text-2xl gradient-text-cyan">{s.value}</div>
              <div className="text-xs font-ibm text-[rgba(255,255,255,0.4)] tracking-widest uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 bg-gradient-to-r from-[#00d2ff] to-[#0099bb] text-black font-orbitron font-bold text-sm tracking-widest rounded-xl btn-glow overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Icon name="Play" size={16} />
              ПОПРОБОВАТЬ БЕСПЛАТНО
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </button>
          <button
            onClick={() => onAuthOpen('register')}
            className="px-8 py-4 border border-[rgba(0,210,255,0.3)] text-[#00d2ff] font-orbitron font-bold text-sm tracking-widest rounded-xl hover:bg-[rgba(0,210,255,0.06)] transition-all duration-300"
          >
            НАЧАТЬ БЕСПЛАТНО
          </button>
        </div>

        {/* Waveform visual */}
        <div className="mt-20 flex items-end justify-center gap-1 h-16 opacity-40">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className={`wave-bar w-1.5 rounded-full bg-gradient-to-t from-[#00d2ff] to-[#7b2fff] wave-bar:nth-child(${(i % 12) + 1})`}
              style={{
                height: '8px',
                animationPlayState: 'running',
                animationDuration: `${0.7 + (i % 5) * 0.1}s`,
                animationDelay: `${(i % 12) * 0.08}s`,
                animationName: ['wave1','wave2','wave3','wave4','wave5'][i % 5],
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
              }}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <Icon name="ChevronDown" size={20} className="text-[rgba(0,210,255,0.4)]" />
      </div>
    </section>
  );
}