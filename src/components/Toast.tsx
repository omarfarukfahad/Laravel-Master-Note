import React from 'react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'info' | 'warning';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => onDismiss(toast.id)}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900/95 dark:bg-zinc-900/95 border border-zinc-800 text-white shadow-xl shadow-black/30 backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-2 duration-200 cursor-pointer"
        >
          {toast.type === 'warning' ? (
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          ) : toast.type === 'info' ? (
            <Info className="w-5 h-5 text-blue-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          <span className="text-sm font-medium text-zinc-100 flex-1">{toast.text}</span>
        </div>
      ))}
    </div>
  );
};
