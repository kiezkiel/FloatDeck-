import { contextBridge, ipcRenderer } from 'electron';

export interface FloatDeckAPI {
  minimize: () => void;
  maximize: () => void;
  close: () => void;
  setOpacity: (opacity: number) => void;
  setGhostMode: (enabled: boolean) => void;
  snapPosition: (position: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left') => void;
  onGhostModeChanged: (callback: (isGhost: boolean) => void) => () => void;
}

const api: FloatDeckAPI = {
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  setOpacity: (opacity: number) => ipcRenderer.send('set-opacity', opacity),
  setGhostMode: (enabled: boolean) => ipcRenderer.send('set-ghost-mode', enabled),
  snapPosition: (pos) => ipcRenderer.send('snap-position', pos),
  onGhostModeChanged: (callback) => {
    const subscription = (_event: any, isGhost: boolean) => callback(isGhost);
    ipcRenderer.on('ghost-mode-changed', subscription);
    return () => {
      ipcRenderer.removeListener('ghost-mode-changed', subscription);
    };
  },
};

contextBridge.exposeInMainWorld('floatDeck', api);
