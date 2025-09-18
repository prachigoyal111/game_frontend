import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react';

export type Toast = {
  id: string;
  type: 'success' | 'error' | 'info';
  title?: string;
  message: string;
};

type ToastContextValue = {
  toasts: Toast[];
  show: (toast: Omit<Toast, 'id'>) => void;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    const full = { ...toast, id } as Toast;
    setToasts((prev) => [...prev, full]);
    // auto dismiss
    setTimeout(() => dismiss(id), 3000);
  }, [dismiss]);

  const value = useMemo(() => ({ toasts, show, dismiss }), [toasts, show, dismiss]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
