'use client';

import { useEffect, useState } from 'react';

const options = [
  { value: 'pt', label: 'PT' },
  { value: 'en', label: 'EN' },
  { value: 'fr', label: 'FR' },
  { value: 'es', label: 'ES' },
];

export default function LanguageSwitcher({ current, label }: { current: string; label: string }) {
  const [value, setValue] = useState(current);

  useEffect(() => {
    if (document.cookie.includes('lang=')) return;
    const browser = navigator.language.toLowerCase();
    const detected = browser.startsWith('pt') ? 'pt' : browser.startsWith('fr') ? 'fr' : browser.startsWith('es') ? 'es' : 'en';
    if (detected !== current) {
      setValue(detected);
      fetch('/api/language', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lang: detected }) })
        .finally(() => window.location.reload());
    }
  }, [current]);

  return (
    <div className="lang-switcher">
      <span>{label}</span>
      <select
        value={value}
        onChange={(e) => {
          const next = e.target.value;
          setValue(next);
          fetch('/api/language', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lang: next }),
          }).finally(() => window.location.reload());
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
