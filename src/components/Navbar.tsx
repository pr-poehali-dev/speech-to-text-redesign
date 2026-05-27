import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  onAuthOpen: (mode: 'login' | 'register') => void;
}

export default function Navbar({ onAuthOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: 'Демо', href: '#demo' },
    { label: 'Функции', href: '#features' },
    { label: 'Цены', href: '#pricing' },
    { label: 'API', href: '#api' },
    { label: 'Контакты', href: '#contact' },
  ];

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-[rgba(0,210,255,0.15)] py-3'
          : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#00d2ff] to-[#7b2fff] opacity-20 pulse-ring" />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#00d2ff] to-[#7b2fff] opacity-10 pulse-ring-delay" />
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-[#00d2ff20] to-[#7b2fff20] border border-[rgba(0,210,255,0.4)] flex items-center justify-center">
              <Icon name="Mic" size={18} className="text-[#00d2ff]" />
            </div>
          </div>
          <span className="font-orbitron font-bold text-lg tracking-wider gradient-text-cyan">
            VOICE<span className="text-[#7b2fff]">AI</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-sm font-ibm text-[rgba(255,255,255,0.6)] hover:text-[#00d2ff] transition-colors duration-200 tracking-wider uppercase"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onAuthOpen('login')}
            className="px-4 py-2 text-sm font-ibm text-[#00d2ff] border border-[rgba(0,210,255,0.3)] rounded-lg hover:bg-[rgba(0,210,255,0.08)] transition-all duration-200"
          >
            Войти
          </button>
          <button
            onClick={() => onAuthOpen('register')}
            className="px-4 py-2 text-sm font-ibm font-medium bg-gradient-to-r from-[#00d2ff] to-[#7b2fff] text-black rounded-lg btn-glow"
          >
            Регистрация
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-[#00d2ff]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-[rgba(0,210,255,0.1)] px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-left text-sm font-ibm text-[rgba(255,255,255,0.7)] hover:text-[#00d2ff] tracking-wider uppercase"
            >
              {l.label}
            </button>
          ))}
          <div className="flex gap-3 pt-2">
            <button onClick={() => { onAuthOpen('login'); setMenuOpen(false); }} className="flex-1 py-2 text-sm text-[#00d2ff] border border-[rgba(0,210,255,0.3)] rounded-lg">Войти</button>
            <button onClick={() => { onAuthOpen('register'); setMenuOpen(false); }} className="flex-1 py-2 text-sm font-medium bg-gradient-to-r from-[#00d2ff] to-[#7b2fff] text-black rounded-lg">Регистрация</button>
          </div>
        </div>
      )}
    </nav>
  );
}
