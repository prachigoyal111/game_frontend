import { SelectHTMLAttributes, ReactNode } from 'react';

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  children?: ReactNode;
};

export default function Select({ label, error, className = '', children, ...props }: Props) {
  return (
    <label className={`grid gap-1 ${className}`}>
      {label && <span className="text-sm text-gray-600">{label}</span>}
      <select className="border rounded px-3 py-2 focus:outline-none focus:ring w-full" {...props}>
        {children}
      </select>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
