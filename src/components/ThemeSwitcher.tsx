import React from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { ThemeMode } from '../types';
import { BookOpen, Sun, Moon } from 'lucide-react';

export const ThemeSwitcher: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { theme, setTheme } = useNewspaper();

  const themes: { id: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { id: 'classic', label: 'Cổ điển', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'modern', label: 'Hiện đại', icon: <Sun className="w-3.5 h-3.5" /> },
    { id: 'dark', label: 'Ban đêm', icon: <Moon className="w-3.5 h-3.5" /> },
  ];

  if (compact) {
    return (
      <div 
        className="flex items-center rounded-full p-0.5 border"
        style={{ borderColor: 'var(--border-rule)', backgroundColor: 'var(--bg-subtle)' }}
      >
        {themes.map((t) => {
          const isActive = theme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`p-1.5 rounded-full transition-all flex items-center justify-center ${
                isActive 
                  ? 'shadow-xs font-semibold' 
                  : 'opacity-65 hover:opacity-100'
              }`}
              style={{
                backgroundColor: isActive ? 'var(--bg-card)' : 'transparent',
                color: 'var(--text-ink)',
              }}
              title={`Chế độ: ${t.label}`}
              aria-label={`Chuyển sang giao diện ${t.label}`}
            >
              {t.icon}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div 
      className="inline-flex items-center rounded-md p-1 border text-xs"
      style={{ borderColor: 'var(--border-rule)', backgroundColor: 'var(--bg-subtle)' }}
    >
      {themes.map((t) => {
        const isActive = theme === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-all whitespace-nowrap ${
              isActive 
                ? 'shadow-xs font-semibold' 
                : 'opacity-60 hover:opacity-100'
            }`}
            style={{
              backgroundColor: isActive ? 'var(--bg-card)' : 'transparent',
              color: 'var(--text-ink)',
            }}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
};
