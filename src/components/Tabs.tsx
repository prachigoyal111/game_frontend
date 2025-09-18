import { ReactNode, useState } from 'react';

type Tab = { key: string; label: string; content: ReactNode };

export default function Tabs({ tabs, initialKey }: { tabs: Tab[]; initialKey?: string }) {
  const [active, setActive] = useState<string>(initialKey || (tabs[0]?.key ?? ''));
  const current = tabs.find((t) => t.key === active);
  return (
    <div>
      <div className="flex gap-2 border-b mb-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-3 py-2 -mb-px border-b-2 ${active === t.key ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div>{current?.content}</div>
    </div>
  );
}
