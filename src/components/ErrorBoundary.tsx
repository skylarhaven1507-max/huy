import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          className="min-h-screen flex items-center justify-center p-6"
          style={{
            backgroundColor: 'var(--bg-main, #FDFBF7)',
            color: 'var(--text-ink, #121212)',
            fontFamily: 'var(--font-sans, system-ui, sans-serif)',
          }}
        >
          <div 
            className="max-w-lg w-full p-8 rounded-xl border shadow-xl text-center space-y-5"
            style={{
              backgroundColor: 'var(--bg-card, #FFFFFF)',
              borderColor: 'var(--border-dark, #121212)',
            }}
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-800 dark:text-amber-300">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-sans font-black uppercase tracking-widest text-[#8B0000]">
                TÒA SOẠN NHẬT BÁO • THÔNG BÁO HỆ THỐNG
              </span>
              <h2 className="font-editorial text-2xl font-black tracking-tight" style={{ fontFamily: 'var(--font-serif, serif)' }}>
                Đã xảy ra sự cố khi tải nội dung
              </h2>
              <p className="text-sm opacity-80 leading-relaxed font-sans">
                Hệ thống đã phát hiện lỗi giao diện và ngăn chặn sự cố màn hình trắng. Bạn có thể tải lại trang hoặc quay về trang chủ.
              </p>
            </div>

            {this.state.error && (
              <div 
                className="text-left p-3 rounded text-xs font-mono overflow-auto max-h-32 border bg-black/5 dark:bg-white/5 opacity-70"
                style={{ borderColor: 'var(--border-rule, #E5E0D5)' }}
              >
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex items-center gap-2 px-4 py-2.5 rounded border text-xs font-bold uppercase tracking-wider hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                style={{ borderColor: 'var(--border-dark, #121212)' }}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Thử lại</span>
              </button>
              <button
                onClick={this.handleReset}
                className="flex items-center gap-2 px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider text-white shadow-md hover:brightness-110 transition-all cursor-pointer"
                style={{ backgroundColor: '#8B0000' }}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Về Trang chủ</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
