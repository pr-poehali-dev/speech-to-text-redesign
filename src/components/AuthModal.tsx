import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onModeSwitch: (mode: 'login' | 'register') => void;
}

export default function AuthModal({ mode, onClose, onModeSwitch }: AuthModalProps) {
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md animate-scale-in">
        {/* Glow */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#00d2ff20] to-[#7b2fff20] blur-xl" />

        <div className="relative glass neon-border rounded-2xl p-8 overflow-hidden">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[rgba(0,210,255,0.5)] rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[rgba(0,210,255,0.5)] rounded-br-2xl" />

          {/* Scan line */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            <div className="scan-line absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,210,255,0.1)] to-transparent" />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse" />
                <span className="font-mono text-[10px] text-[rgba(0,210,255,0.6)] tracking-[0.3em]">
                  {mode === 'login' ? 'АВТОРИЗАЦИЯ' : 'РЕГИСТРАЦИЯ'}
                </span>
              </div>
              <h2 className="font-orbitron font-bold text-2xl text-white">
                {mode === 'login' ? 'Добро пожаловать' : 'Создать аккаунт'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.4)] hover:text-white hover:border-[rgba(255,255,255,0.2)] transition-all"
            >
              <Icon name="X" size={16} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block font-mono text-[10px] text-[rgba(255,255,255,0.35)] tracking-widest mb-2">
                  ИМЯ
                </label>
                <div className="relative">
                  <Icon name="User" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.25)]" />
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="Александр"
                    className="w-full pl-10 pr-4 py-3 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.08)] focus:border-[rgba(0,210,255,0.5)] rounded-xl font-ibm text-sm text-white placeholder-[rgba(255,255,255,0.2)] outline-none transition-all duration-200"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block font-mono text-[10px] text-[rgba(255,255,255,0.35)] tracking-widest mb-2">
                EMAIL
              </label>
              <div className="relative">
                <Icon name="Mail" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.25)]" />
                <input
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.08)] focus:border-[rgba(0,210,255,0.5)] rounded-xl font-ibm text-sm text-white placeholder-[rgba(255,255,255,0.2)] outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-[10px] text-[rgba(255,255,255,0.35)] tracking-widest">
                  ПАРОЛЬ
                </label>
                {mode === 'login' && (
                  <button type="button" className="font-ibm text-xs text-[rgba(0,210,255,0.5)] hover:text-[#00d2ff] transition-colors">
                    Забыли пароль?
                  </button>
                )}
              </div>
              <div className="relative">
                <Icon name="Lock" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.25)]" />
                <input
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.08)] focus:border-[rgba(0,210,255,0.5)] rounded-xl font-ibm text-sm text-white placeholder-[rgba(255,255,255,0.2)] outline-none transition-all duration-200"
                />
              </div>
            </div>

            {mode === 'register' && (
              <p className="font-ibm text-xs text-[rgba(255,255,255,0.3)] leading-relaxed">
                Регистрируясь, вы соглашаетесь с{' '}
                <span className="text-[rgba(0,210,255,0.6)] cursor-pointer hover:text-[#00d2ff]">условиями использования</span>{' '}
                и{' '}
                <span className="text-[rgba(0,210,255,0.6)] cursor-pointer hover:text-[#00d2ff]">политикой конфиденциальности</span>
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 bg-gradient-to-r from-[#00d2ff] to-[#7b2fff] text-black font-orbitron font-bold text-sm tracking-widest rounded-xl btn-glow flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <Icon name="Loader" size={16} className="animate-spin" />
              ) : (
                <Icon name={mode === 'login' ? 'LogIn' : 'UserPlus'} size={16} />
              )}
              {loading ? 'ЗАГРУЗКА...' : mode === 'login' ? 'ВОЙТИ' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
            <span className="font-mono text-xs text-[rgba(255,255,255,0.2)]">или</span>
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
          </div>

          {/* Switch mode */}
          <p className="text-center font-ibm text-sm text-[rgba(255,255,255,0.35)]">
            {mode === 'login' ? 'Нет аккаунта?' : 'Уже зарегистрированы?'}{' '}
            <button
              onClick={() => onModeSwitch(mode === 'login' ? 'register' : 'login')}
              className="text-[#00d2ff] hover:text-white transition-colors font-medium"
            >
              {mode === 'login' ? 'Создать аккаунт' : 'Войти'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
