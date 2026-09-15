export interface Tab {
  id: string;
  title: string;
  url: string;
  preset?: 'youtube' | 'docs' | 'ai' | 'localhost' | 'custom';
}

export interface FloatDeckAPI {
  minimize: () => void;
  maximize: () => void;
  close: () => void;
  setOpacity: (opacity: number) => void;
  setGhostMode: (enabled: boolean) => void;
  snapPosition: (position: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left') => void;
  onGhostModeChanged: (callback: (isGhost: boolean) => void) => () => void;
}

declare global {
  interface Window {
    floatDeck?: FloatDeckAPI;
  }
}
