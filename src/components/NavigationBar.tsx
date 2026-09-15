import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, CornerUpRight, Search, ExternalLink } from 'lucide-react';

interface NavigationBarProps {
  currentUrl: string;
  onNavigate: (url: string) => void;
  onReload: () => void;
  onGoBack: () => void;
  onGoForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  currentUrl,
  onNavigate,
  onReload,
  onGoBack,
  onGoForward,
  canGoBack,
  canGoForward,
}) => {
  const [inputUrl, setInputUrl] = useState(currentUrl);

  useEffect(() => {
    setInputUrl(currentUrl);
  }, [currentUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let target = inputUrl.trim();
    if (!target) return;

    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      if (target.startsWith('localhost:') || target.startsWith('127.0.0.1:')) {
        target = 'http://' + target;
      } else if (target.includes('.') && !target.includes(' ')) {
        target = 'https://' + target;
      } else {
        target = `https://www.google.com/search?q=${encodeURIComponent(target)}`;
      }
    }
    onNavigate(target);
  };

  const handleSnap = (pos: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left') => {
    window.floatDeck?.snapPosition(pos);
  };

  return (
    <div className="titlebar-nodrag h-9 px-2 bg-slate-900/90 border-b border-slate-800 flex items-center gap-1.5 text-xs">
      <button
        onClick={onGoBack}
        disabled={!canGoBack}
        className="p-1 text-slate-400 hover:text-slate-100 disabled:opacity-30 disabled:hover:text-slate-400 rounded transition"
        title="Back"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={onGoForward}
        disabled={!canGoForward}
        className="p-1 text-slate-400 hover:text-slate-100 disabled:opacity-30 disabled:hover:text-slate-400 rounded transition"
        title="Forward"
      >
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={onReload}
        className="p-1 text-slate-400 hover:text-slate-100 rounded transition"
        title="Reload"
      >
        <RotateCw className="w-3.5 h-3.5" />
      </button>

      {/* Address Bar */}
      <form onSubmit={handleSubmit} className="flex-1 flex items-center">
        <div className="w-full flex items-center bg-slate-950/80 border border-slate-750 focus-within:border-cyan-500/70 rounded-md px-2 py-0.5 text-slate-300 transition-colors">
          <Search className="w-3 h-3 text-slate-500 mr-1.5 shrink-0" />
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Enter URL or search..."
            className="w-full bg-transparent text-[11px] text-slate-200 outline-none placeholder:text-slate-600 font-mono"
          />
        </div>
      </form>

      {/* Snap Preset Menu */}
      <div className="flex items-center gap-0.5 border-l border-slate-800 pl-1.5">
        <button
          onClick={() => handleSnap('top-right')}
          className="p-1 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 rounded transition text-[10px]"
          title="Snap Top-Right"
        >
          ↗
        </button>
        <button
          onClick={() => handleSnap('bottom-right')}
          className="p-1 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 rounded transition text-[10px]"
          title="Snap Bottom-Right"
        >
          ↘
        </button>
        <button
          onClick={() => handleSnap('top-left')}
          className="p-1 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 rounded transition text-[10px]"
          title="Snap Top-Left"
        >
          ↖
        </button>
      </div>
    </div>
  );
};
