import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';

const DEMO_TEXTS = [
  'Искусственный интеллект трансформирует способ взаимодействия человека с технологиями. Голосовые интерфейсы становятся новой нормой.',
  'Наша нейросеть распознаёт речь с точностью 99% даже в условиях шума. Поддерживает более 50 языков и диалектов.',
  'Встреча прошла продуктивно. Обсудили квартальные результаты, поставили задачи на следующий спринт, согласовали бюджет.',
];

export default function DemoSection() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [demoIdx, setDemoIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessing(true);
      timerRef.current = setTimeout(() => {
        setIsProcessing(false);
        setResult(DEMO_TEXTS[demoIdx % DEMO_TEXTS.length]);
        setDemoIdx(i => i + 1);
      }, 1800);
    } else {
      setResult('');
      setIsRecording(true);
    }
  };

  const copyResult = () => {
    if (result) navigator.clipboard.writeText(result);
  };

  return (
    <section id="demo" className="relative py-32 overflow-hidden">
      {/* bg */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[rgba(0,210,255,0.2)] to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00d2ff] tracking-[0.3em] uppercase mb-4">
            <div className="w-8 h-px bg-[#00d2ff]" />
            LIVE DEMO
            <div className="w-8 h-px bg-[#00d2ff]" />
          </div>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-4">
            ПОПРОБУЙ ПРЯМО СЕЙЧАС
          </h2>
          <p className="font-ibm text-[rgba(255,255,255,0.5)] text-lg">
            Нажми кнопку и начни говорить. Наша нейросеть распознает речь в реальном времени.
          </p>
        </div>

        {/* Demo card */}
        <div className="relative neon-border glass rounded-2xl p-8 corner-tl corner-br">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[rgba(0,210,255,0.6)] rounded-tl-lg" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[rgba(0,210,255,0.6)] rounded-br-lg" />

          {/* Waveform visualizer */}
          <div className="flex items-center justify-center gap-1 h-20 mb-8">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className={`wave-bar rounded-full transition-all duration-300 ${
                  isRecording
                    ? 'bg-gradient-to-t from-[#00d2ff] to-[#7b2fff]'
                    : 'bg-[rgba(255,255,255,0.1)]'
                }`}
                style={{
                  width: '6px',
                  height: isRecording ? undefined : '4px',
                  animationPlayState: isRecording ? 'running' : 'paused',
                }}
              />
            ))}
          </div>

          {/* Status */}
          <div className="text-center mb-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono ${
              isRecording
                ? 'bg-[rgba(255,80,80,0.1)] border border-[rgba(255,80,80,0.3)] text-red-400'
                : isProcessing
                ? 'bg-[rgba(0,210,255,0.1)] border border-[rgba(0,210,255,0.3)] text-[#00d2ff]'
                : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.4)]'
            }`}>
              {isRecording && <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />}
              {isProcessing && <Icon name="Loader" size={14} className="animate-spin" />}
              {!isRecording && !isProcessing && <Icon name="Mic" size={14} />}
              {isRecording ? 'ЗАПИСЬ...' : isProcessing ? 'ОБРАБОТКА...' : 'ГОТОВ К ЗАПИСИ'}
            </div>
          </div>

          {/* Big record button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleRecord}
              className={`relative w-24 h-24 rounded-full transition-all duration-300 flex items-center justify-center ${
                isRecording
                  ? 'bg-red-500 shadow-[0_0_40px_rgba(255,80,80,0.6)]'
                  : 'bg-gradient-to-br from-[#00d2ff] to-[#7b2fff] btn-glow'
              }`}
            >
              {isRecording && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-red-400 pulse-ring" />
                  <div className="absolute inset-0 rounded-full border-2 border-red-400 pulse-ring-delay" />
                </>
              )}
              <Icon
                name={isRecording ? 'Square' : 'Mic'}
                size={32}
                className="text-black relative z-10"
              />
            </button>
          </div>

          {/* Result area */}
          <div className="relative min-h-[120px] bg-[rgba(0,0,0,0.3)] rounded-xl border border-[rgba(255,255,255,0.06)] p-6">
            {isProcessing && (
              <div className="flex items-center gap-3 text-[rgba(0,210,255,0.6)]">
                <div className="flex gap-1">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-[#00d2ff] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
                <span className="font-mono text-sm">Нейросеть анализирует...</span>
              </div>
            )}
            {result && !isProcessing && (
              <div>
                <div className="flex items-start justify-between gap-4">
                  <p className="font-ibm text-[rgba(255,255,255,0.85)] leading-relaxed text-lg">
                    {result}
                  </p>
                  <button
                    onClick={copyResult}
                    className="flex-shrink-0 p-2 rounded-lg hover:bg-[rgba(0,210,255,0.1)] text-[rgba(0,210,255,0.6)] hover:text-[#00d2ff] transition-colors"
                  >
                    <Icon name="Copy" size={16} />
                  </button>
                </div>
                <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center gap-6 text-xs font-mono text-[rgba(255,255,255,0.3)]">
                  <span>ТОЧНОСТЬ: <span className="text-[#00d2ff]">99.2%</span></span>
                  <span>ЯЗЫК: <span className="text-[#00d2ff]">RU</span></span>
                  <span>ВРЕМЯ: <span className="text-[#00d2ff]">0.31с</span></span>
                </div>
              </div>
            )}
            {!result && !isProcessing && (
              <p className="text-[rgba(255,255,255,0.2)] font-ibm text-center mt-6">
                Результат распознавания появится здесь...
              </p>
            )}
          </div>

          {/* Upload alternative */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
            <span className="text-xs font-mono text-[rgba(255,255,255,0.3)]">или</span>
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
          </div>
          <button className="mt-4 w-full py-3 rounded-xl border border-dashed border-[rgba(0,210,255,0.2)] text-[rgba(0,210,255,0.5)] hover:border-[rgba(0,210,255,0.4)] hover:text-[#00d2ff] transition-all font-ibm text-sm flex items-center justify-center gap-2">
            <Icon name="Upload" size={16} />
            Загрузить аудио / видео файл
          </button>
        </div>
      </div>
    </section>
  );
}
