import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';

const API_URL = 'https://functions.poehali.dev/b41f3a3a-76c2-4653-a7d9-78caee93ab75';

export default function DemoSection() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [resultMeta, setResultMeta] = useState<{ language?: string; elapsed?: number; duration?: number } | null>(null);
  const [error, setError] = useState('');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const transcribeBlob = async (blob: Blob, filename: string) => {
    setIsProcessing(true);
    setResult('');
    setError('');
    setResultMeta(null);

    try {
      const arrayBuffer = await blob.arrayBuffer();
      const uint8 = new Uint8Array(arrayBuffer);
      let binary = '';
      uint8.forEach(b => { binary += String.fromCharCode(b); });
      const b64 = btoa(binary);

      const resp = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: b64, filename, language: 'ru' }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        setError(data.error || 'Ошибка сервера');
      } else {
        setResult(data.text || '');
        setResultMeta({ language: data.language, elapsed: data.elapsed, duration: data.duration });
      }
    } catch {
      setError('Не удалось связаться с сервером. Проверьте интернет-соединение.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file.name);
    e.target.value = '';
    await transcribeBlob(file, file.name);
  };

  const handleRecord = async () => {
    if (isRecording) {
      // Останавливаем запись
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      setResult('');
      setError('');
      setUploadedFile(null);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mr = new MediaRecorder(stream);
        chunksRef.current = [];
        mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
        mr.onstop = async () => {
          stream.getTracks().forEach(t => t.stop());
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
          await transcribeBlob(blob, 'recording.webm');
        };
        mr.start();
        mediaRecorderRef.current = mr;
        setIsRecording(true);
      } catch {
        setError('Нет доступа к микрофону. Разрешите доступ в браузере.');
      }
    }
  };

  const copyResult = () => {
    if (result) navigator.clipboard.writeText(result);
  };

  return (
    <section id="demo" className="relative py-32 overflow-hidden">
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
            Запиши голос или загрузи аудио/видео файл — Whisper распознает речь точно и быстро.
          </p>
        </div>

        {/* Demo card */}
        <div className="relative neon-border glass rounded-2xl p-8">
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[rgba(0,210,255,0.6)] rounded-tl-lg" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[rgba(0,210,255,0.6)] rounded-br-lg" />

          {/* Waveform visualizer */}
          <div className="flex items-center justify-center gap-1 h-20 mb-8">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className={`wave-bar rounded-full transition-all duration-300 ${
                  isRecording || isProcessing
                    ? 'bg-gradient-to-t from-[#00d2ff] to-[#7b2fff]'
                    : 'bg-[rgba(255,255,255,0.1)]'
                }`}
                style={{
                  width: '6px',
                  height: isRecording || isProcessing ? undefined : '4px',
                  animationPlayState: isRecording || isProcessing ? 'running' : 'paused',
                }}
              />
            ))}
          </div>

          {/* Status badge */}
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
              {isRecording ? 'ЗАПИСЬ...' : isProcessing ? 'ОТПРАВЛЯЮ В WHISPER...' : 'ГОТОВ К ЗАПИСИ'}
            </div>
          </div>

          {/* Record button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleRecord}
              disabled={isProcessing}
              className={`relative w-24 h-24 rounded-full transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${
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
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-[#00d2ff] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
                <span className="font-mono text-sm">Whisper анализирует речь...</span>
              </div>
            )}

            {error && !isProcessing && (
              <div className="flex items-start gap-3 text-red-400">
                <Icon name="AlertCircle" size={16} className="mt-0.5 flex-shrink-0" />
                <p className="font-ibm text-sm">{error}</p>
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
                {resultMeta && (
                  <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap items-center gap-6 text-xs font-mono text-[rgba(255,255,255,0.3)]">
                    {resultMeta.language && (
                      <span>ЯЗЫК: <span className="text-[#00d2ff]">{resultMeta.language.toUpperCase()}</span></span>
                    )}
                    {resultMeta.duration && (
                      <span>ДЛИНА: <span className="text-[#00d2ff]">{Math.round(resultMeta.duration)}с</span></span>
                    )}
                    {resultMeta.elapsed && (
                      <span>ВРЕМЯ ОБРАБОТКИ: <span className="text-[#00d2ff]">{resultMeta.elapsed}с</span></span>
                    )}
                    <span className="flex items-center gap-1 text-[#00ff99]">
                      <Icon name="Check" size={11} />
                      WHISPER AI
                    </span>
                  </div>
                )}
              </div>
            )}

            {!result && !isProcessing && !error && (
              <p className="text-[rgba(255,255,255,0.2)] font-ibm text-center mt-6">
                Результат распознавания появится здесь...
              </p>
            )}
          </div>

          {/* Upload */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
            <span className="text-xs font-mono text-[rgba(255,255,255,0.3)]">или</span>
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*,video/*,.mp3,.mp4,.wav,.ogg,.m4a,.webm,.flac"
            className="hidden"
            onChange={handleFileUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing || isRecording}
            className="mt-4 w-full py-3 rounded-xl border border-dashed border-[rgba(0,210,255,0.2)] text-[rgba(0,210,255,0.5)] hover:border-[rgba(0,210,255,0.4)] hover:text-[#00d2ff] transition-all font-ibm text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Icon name="Upload" size={16} />
            {uploadedFile && isProcessing ? uploadedFile : 'Загрузить аудио / видео файл'}
          </button>
        </div>
      </div>
    </section>
  );
}
