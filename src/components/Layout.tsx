import React from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { Header } from './Header';
import { BreakingNewsTicker } from './BreakingNewsTicker';
import { Footer } from './Footer';
import { AudioPlayerBar } from './AudioPlayerBar';
import { ToastContainer } from './ToastContainer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentRoute, focusedReadingMode } = useNewspaper();

  return (
    <div 
      className="min-h-screen flex flex-col transition-colors selection:bg-amber-200 dark:selection:bg-amber-900/60"
      style={{
        backgroundColor: 'var(--bg-main)',
        color: 'var(--text-ink)',
      }}
    >
      {/* Editorial Header */}
      {!focusedReadingMode && <Header />}

      {/* Breaking News Ticker (Shown on Home and Category pages) */}
      {!focusedReadingMode && (currentRoute.page === 'home' || currentRoute.page === 'category') && (
        <BreakingNewsTicker />
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {children}
      </main>

      {/* Footer */}
      {!focusedReadingMode && <Footer />}

      {/* Persistent Audio Player Bar */}
      <AudioPlayerBar />

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};
