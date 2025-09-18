import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string };

export default function NumberInput({ label, error, className = '', ...props }: Props) {
  return (
    <label className={`grid gap-1 ${className}`}>
      {label && <span className="text-sm text-gray-600">{label}</span>}
      <input
        type="number"
        className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
