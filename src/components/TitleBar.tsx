import React from 'react';
import { Tab } from '../types';
import { Minus, Square, X, Plus, Ghost, Pin, Video, BookOpen, Sparkles, Laptop, Globe } from 'lucide-react';

interface TitleBarProps {
  tabs: Tab[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onAddTab: () => void;
  onCloseTab: (id: string) => void;
  isGhostMode: boolean;
}

export const TitleBar: React.FC<TitleBarProps> = ({
  tabs,
  activeTabId,
  onSelectTab,
  onAddTab,
  onCloseTab,
  isGhostMode,
}) => {
  const handleMinimize = () => window.floatDeck?.minimize();
  const handleMaximize = () => window.floatDeck?.maximize();
  const handleClose = () => window.floatDeck?.close();

  const getPresetIcon = (preset?: string) => {
    switch (preset) {
      case 'youtube':
        return <Video className="w-3.5 h-3.5 text-red-400 shrink-0" />;
      case 'docs':
        return <BookOpen className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      case 'ai':
        return <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      case 'localhost':
        return <Laptop className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
    }
  };

  return (
    <div className="titlebar-drag h-10 w-full bg-slate-950/90 border-b border-slate-800/80 flex items-center justify-between px-2 text-xs select-none">
      {/* Tabs list */}
      <div className="titlebar-nodrag flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[calc(100%-140px)]">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-md cursor-pointer transition-all duration-150 max-w-[140px] ${
                isActive
                  ? 'bg-slate-800 text-cyan-300 font-medium border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {getPresetIcon(tab.preset)}
              <span className="truncate text-[11px]">{tab.title}</span>
              {tabs.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(tab.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 hover:text-red-400 rounded p-0.5 transition"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}

        <button
          onClick={onAddTab}
          title="New Tab"
          className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-850 transition"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right status & window controls */}
      <div className="titlebar-nodrag flex items-center gap-1 shrink-0">
        {isGhostMode ? (
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] animate-pulse">
            <Ghost className="w-3 h-3" />
            <span>GHOST</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-medium px-1.5 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/40">
            <Pin className="w-2.5 h-2.5" />
            <span>HUD</span>
          </div>
        )}

        <div className="h-4 w-[1px] bg-slate-800 mx-1" />

        <button
          onClick={handleMinimize}
          className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition"
          title="Minimize"
        >
          <Minus className="w-3 h-3" />
        </button>
        <button
          onClick={handleMaximize}
          className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition"
          title="Maximize"
        >
          <Square className="w-3 h-3" />
        </button>
        <button
          onClick={handleClose}
          className="p-1.5 text-slate-400 hover:text-red-300 hover:bg-red-500/20 rounded transition"
          title="Close"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
