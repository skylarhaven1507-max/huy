import React from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { CheckCircle2, Bookmark, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useNewspaper();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none no-print">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-lg shadow-lg border text-sm transition-all duration-200"
          style={{
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-ink)',
            borderColor: 'var(--border-rule)',
          }}
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'bookmark' && <Bookmark className="w-4 h-4 text-amber-600 shrink-0" />}
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-sky-600 shrink-0" />}
            <span>{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Đóng thông báo"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
