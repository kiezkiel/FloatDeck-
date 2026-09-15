import { app, BrowserWindow, ipcMain, globalShortcut, screen } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null = null;
let isGhostMode = false;
let currentOpacity = 0.92;

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight, x: workX, y: workY } = primaryDisplay.workArea;

  const windowWidth = 520;
  const windowHeight = 420;
  const initialX = workX + screenWidth - windowWidth - 24;
  const initialY = workY + 24;

  mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    x: initialX,
    y: initialY,
    minWidth: 320,
    minHeight: 220,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    alwaysOnTop: true,
    hasShadow: true,
    icon: path.join(__dirname, '../build/icon.png'),
    skipTaskbar: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true,
    },
  });

  // Always on top level for developer overlay above full screen IDE
  mainWindow.setAlwaysOnTop(true, 'screen-saver');
  mainWindow.setOpacity(currentOpacity);

  const devServerUrl = process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173';

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  } else {
    mainWindow.loadURL(devServerUrl).catch(() => {
      // If dev server takes a second to start, retry once
      setTimeout(() => {
        mainWindow?.loadURL(devServerUrl);
      }, 1000);
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// IPC handlers
ipcMain.on('window-minimize', () => {
  mainWindow?.minimize();
});

ipcMain.on('window-maximize', () => {
  if (!mainWindow) return;
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on('window-close', () => {
  mainWindow?.close();
});

ipcMain.on('set-opacity', (_event, opacity: number) => {
  if (!mainWindow) return;
  currentOpacity = Math.max(0.1, Math.min(1.0, opacity));
  mainWindow.setOpacity(currentOpacity);
});

ipcMain.on('set-ghost-mode', (_event, enabled: boolean) => {
  if (!mainWindow) return;
  isGhostMode = enabled;
  mainWindow.setIgnoreMouseEvents(isGhostMode, { forward: true });
  mainWindow.webContents.send('ghost-mode-changed', isGhostMode);
});

ipcMain.on('snap-position', (_event, position: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left') => {
  if (!mainWindow) return;
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight, x: workX, y: workY } = primaryDisplay.workArea;
  const [w, h] = mainWindow.getSize();
  const margin = 20;

  let targetX = workX + screenWidth - w - margin;
  let targetY = workY + margin;

  switch (position) {
    case 'top-right':
      targetX = workX + screenWidth - w - margin;
      targetY = workY + margin;
      break;
    case 'bottom-right':
      targetX = workX + screenWidth - w - margin;
      targetY = workY + screenHeight - h - margin;
      break;
    case 'top-left':
      targetX = workX + margin;
      targetY = workY + margin;
      break;
    case 'bottom-left':
      targetX = workX + margin;
      targetY = workY + screenHeight - h - margin;
      break;
  }

  mainWindow.setPosition(Math.round(targetX), Math.round(targetY), true);
});

app.whenReady().then(() => {
  createWindow();

  // Global hotkeys
  // Alt+G: Toggle Ghost Mode (Click-Through)
  globalShortcut.register('Alt+G', () => {
    if (!mainWindow) return;
    isGhostMode = !isGhostMode;
    mainWindow.setIgnoreMouseEvents(isGhostMode, { forward: true });
    mainWindow.webContents.send('ghost-mode-changed', isGhostMode);
  });

  // Alt+\: Toggle Show/Hide
  globalShortcut.register('Alt+\\', () => {
    if (!mainWindow) return;
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
