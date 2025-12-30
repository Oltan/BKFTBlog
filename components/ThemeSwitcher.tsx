'use client';

import { useTheme } from '@/lib/theme-context';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'default', name: 'Default', icon: '🌟' },
    { id: 'cyberpunk', name: 'Cyberpunk', icon: '🌆' },
    { id: 'fantasy', name: 'Fantasy', icon: '🏰' },
    { id: 'space', name: 'Space', icon: '🚀' },
  ] as const;

  return (
    <div className="flex gap-2">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`px-3 py-2 rounded-lg transition-all ${
            theme === t.id
              ? 'btn-primary scale-110'
              : 'bg-gray-200 dark:bg-gray-700 hover:scale-105'
          }`}
          title={t.name}
        >
          <span className="text-xl">{t.icon}</span>
        </button>
      ))}
    </div>
  );
}
