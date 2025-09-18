import { useToast } from './ToastContext';

export default function Toaster() {
  const { toasts, dismiss } = useToast();
  return (
    <div className="fixed top-4 right-4 z-50 grid gap-2">
      {toasts.map(t => (
        <div key={t.id} className={`min-w-[240px] max-w-sm p-3 rounded shadow border bg-white ${t.type === 'success' ? 'border-green-300' : t.type === 'error' ? 'border-red-300' : 'border-gray-200'}`}>
          {t.title && <div className="font-semibold mb-1">{t.title}</div>}
          <div className="text-sm">{t.message}</div>
          <button className="text-xs text-gray-500 mt-1" onClick={()=>dismiss(t.id)}>Dismiss</button>
        </div>
      ))}
    </div>
  );
}
