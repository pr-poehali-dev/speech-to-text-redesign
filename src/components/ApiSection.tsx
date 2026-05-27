import { useState } from 'react';
import Icon from '@/components/ui/icon';

const CODE_EXAMPLES = {
  python: `import voiceai

client = voiceai.Client(api_key="va_your_key")

# Транскрибация файла
result = client.transcribe(
    file="audio.mp3",
    language="ru",
    diarize=True,
)

print(result.text)
# → "Привет, это тестовая запись..."

for speaker in result.speakers:
    print(f"{speaker.id}: {speaker.text}")`,

  javascript: `import VoiceAI from '@voiceai/sdk';

const client = new VoiceAI({ apiKey: 'va_your_key' });

// Стриминг в реальном времени
const stream = await client.stream({
  language: 'ru',
  onPartial: (text) => console.log('→', text),
});

stream.pipe(microphoneStream);

const final = await stream.finalize();
console.log(final.text);`,

  curl: `curl -X POST https://api.voiceai.ru/v1/transcribe \\
  -H "Authorization: Bearer va_your_key" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@audio.mp3" \\
  -F "language=ru" \\
  -F "diarize=true" \\
  -F "format=srt"

# Response:
{
  "id": "tr_01J8XKZP...",
  "text": "Добрый день...",
  "duration": 142.3,
  "confidence": 0.992
}`,
};

const ENDPOINTS = [
  { id: 'transcribe', method: 'POST', path: '/v1/transcribe', desc: 'Транскрибация файла', color: '#00d2ff' },
  { id: 'get-result', method: 'GET', path: '/v1/transcriptions/{id}', desc: 'Получить результат', color: '#00ff99' },
  { id: 'stream', method: 'POST', path: '/v1/stream', desc: 'WebSocket стриминг', color: '#7b2fff' },
  { id: 'languages', method: 'GET', path: '/v1/languages', desc: 'Список языков', color: '#00ff99' },
  { id: 'delete', method: 'DELETE', path: '/v1/transcriptions/{id}', desc: 'Удалить запись', color: '#ff4444' },
];

type Lang = 'python' | 'javascript' | 'curl';

export default function ApiSection() {
  const [lang, setLang] = useState<Lang>('python');
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(CODE_EXAMPLES[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-[#7b2fff] opacity-[0.04] blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#7b2fff] tracking-[0.3em] uppercase mb-4">
            <div className="w-8 h-px bg-[#7b2fff]" />
            ДЛЯ РАЗРАБОТЧИКОВ
            <div className="w-8 h-px bg-[#7b2fff]" />
          </div>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-4">
            REST API
          </h2>
          <p className="font-ibm text-[rgba(255,255,255,0.45)] text-lg">
            Интегрируй распознавание речи в свой продукт за 5 минут
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Endpoints list */}
          <div className="lg:col-span-2">
            <div className="neon-border-purple glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#7b2fff]" />
                <span className="font-mono text-xs text-[rgba(255,255,255,0.4)] tracking-widest">ENDPOINTS</span>
              </div>
              <div className="space-y-3">
                {ENDPOINTS.map(ep => (
                  <div
                    key={ep.id}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer group"
                  >
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-1 rounded flex-shrink-0"
                      style={{ color: ep.color, background: `${ep.color}15`, border: `1px solid ${ep.color}25` }}
                    >
                      {ep.method}
                    </span>
                    <div className="min-w-0">
                      <div className="font-mono text-xs text-[rgba(255,255,255,0.7)] group-hover:text-white transition-colors truncate">
                        {ep.path}
                      </div>
                      <div className="font-ibm text-[11px] text-[rgba(255,255,255,0.3)] mt-0.5">{ep.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                <div className="font-mono text-xs text-[rgba(255,255,255,0.3)] mb-3">BASE URL</div>
                <div className="font-mono text-sm text-[#00d2ff] bg-[rgba(0,210,255,0.06)] rounded-lg p-3 border border-[rgba(0,210,255,0.12)]">
                  https://api.voiceai.ru/v1
                </div>
              </div>
            </div>
          </div>

          {/* Code block */}
          <div className="lg:col-span-3">
            <div className="neon-border glass rounded-2xl overflow-hidden">
              {/* Tabs */}
              <div className="flex items-center border-b border-[rgba(255,255,255,0.06)] bg-[rgba(0,0,0,0.2)]">
                {(['python', 'javascript', 'curl'] as Lang[]).map(l => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-5 py-3 font-mono text-xs tracking-wider transition-all duration-200 ${
                      lang === l
                        ? 'text-[#00d2ff] border-b-2 border-[#00d2ff] bg-[rgba(0,210,255,0.05)]'
                        : 'text-[rgba(255,255,255,0.35)] hover:text-[rgba(255,255,255,0.6)]'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
                <div className="flex-1" />
                <button
                  onClick={copy}
                  className="flex items-center gap-1.5 px-4 py-3 font-mono text-xs text-[rgba(255,255,255,0.35)] hover:text-[#00d2ff] transition-colors"
                >
                  <Icon name={copied ? 'Check' : 'Copy'} size={13} />
                  {copied ? 'СКОПИРОВАНО' : 'КОПИРОВАТЬ'}
                </button>
              </div>

              {/* Code */}
              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed text-[rgba(255,255,255,0.75)] whitespace-pre">
                  {CODE_EXAMPLES[lang].split('\n').map((line, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="select-none text-[rgba(255,255,255,0.15)] w-6 text-right flex-shrink-0">
                        {i + 1}
                      </span>
                      <span
                        className={
                          line.trim().startsWith('#')
                            ? 'text-[rgba(255,255,255,0.3)] italic'
                            : line.includes('va_your_key')
                            ? 'text-[#ff6b35]'
                            : line.includes('voiceai') || line.includes('VoiceAI') || line.includes('client')
                            ? 'text-[#00d2ff]'
                            : 'text-[rgba(255,255,255,0.75)]'
                        }
                      >
                        {line || ' '}
                      </span>
                    </div>
                  ))}
                </pre>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(0,0,0,0.2)] flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs font-mono text-[rgba(255,255,255,0.25)]">
                  <span>SDK: Python · JS · Go · PHP</span>
                </div>
                <button className="flex items-center gap-2 text-xs font-mono text-[#7b2fff] hover:text-[#9b6fff] transition-colors">
                  <Icon name="ExternalLink" size={12} />
                  ПОЛНАЯ ДОКУМЕНТАЦИЯ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}