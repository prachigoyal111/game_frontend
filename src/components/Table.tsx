import { ReactNode } from 'react';

export default function Table({ headers, children }: { headers: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto border rounded bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            {headers.map((h) => (
              <th key={h} className="py-2 px-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}
