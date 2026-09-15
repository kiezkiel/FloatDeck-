import React, { useState } from 'react';
import { Eye, Ghost, Sparkles, Video, BookOpen, Laptop, Sliders } from 'lucide-react';

interface ControlToolbarProps {
  opacity: number;
  onOpacityChange: (val: number) => void;
  isGhostMode: boolean;
  onToggleGhostMode: () => void;
  onAddPresetTab: (preset: 'youtube' | 'docs' | 'ai' | 'localhost') => void;
}

export const ControlToolbar: React.FC<ControlToolbarProps> = ({
  opacity,
  onOpacityChange,
  isGhostMode,
  onToggleGhostMode,
  onAddPresetTab,
}) => {
  const [showPresets, setShowPresets] = useState(false);

  return (
    <div className="titlebar-nodrag h-8 px-2.5 bg-slate-950/95 border-t border-slate-850 flex items-center justify-between text-xs text-slate-300">
      {/* Left: Quick Presets */}
      <div className="flex items-center gap-1">
        <span className="text-[10px] text-slate-500 font-medium mr-1">Presets:</span>
        <button
          onClick={() => onAddPresetTab('youtube')}
          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-red-400 transition"
          title="Open YouTube"
        >
          <Video className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onAddPresetTab('docs')}
          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-blue-400 transition"
          title="Open React Docs"
        >
          <BookOpen className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onAddPresetTab('ai')}
          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-amber-400 transition"
          title="Open ChatGPT"
        >
          <Sparkles className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onAddPresetTab('localhost')}
          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-emerald-400 transition"
          title="Open Localhost:3000"
        >
          <Laptop className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right: Opacity & Ghost Mode */}
      <div className="flex items-center gap-3">
        {/* Opacity Slider */}
        <div className="flex items-center gap-1.5">
          <Eye className="w-3 h-3 text-slate-400 shrink-0" />
          <input
            type="range"
            min="15"
            max="100"
            value={Math.round(opacity * 100)}
            onChange={(e) => onOpacityChange(Number(e.target.value) / 100)}
            className="w-16 h-1 accent-cyan-400 cursor-pointer bg-slate-800 rounded"
            title="Window Opacity"
          />
          <span className="text-[10px] text-cyan-300 font-mono w-7">
            {Math.round(opacity * 100)}%
          </span>
        </div>

        <div className="h-3.5 w-[1px] bg-slate-800" />

        {/* Ghost Mode Toggle */}
        <button
          onClick={onToggleGhostMode}
          className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition ${
            isGhostMode
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
          title="Ghost Mode (Alt+G): Clicks pass straight through to your code"
        >
          <Ghost className="w-3 h-3" />
          <span>Ghost (Alt+G)</span>
        </button>
      </div>
    </div>
  );
};
