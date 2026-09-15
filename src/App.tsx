import React, { useState, useEffect } from 'react';
import { Tab } from './types';
import { TitleBar } from './components/TitleBar';
import { NavigationBar } from './components/NavigationBar';
import { BrowserViewport } from './components/BrowserViewport';
import { ControlToolbar } from './components/ControlToolbar';

const DEFAULT_TABS: Tab[] = [
  {
    id: 'tab-1',
    title: 'YouTube',
    url: 'https://www.youtube.com',
    preset: 'youtube',
  },
  {
    id: 'tab-2',
    title: 'React Docs',
    url: 'https://react.dev',
    preset: 'docs',
  },
  {
    id: 'tab-3',
    title: 'Localhost:3000',
    url: 'http://localhost:3000',
    preset: 'localhost',
  },
];

export default function App() {
  const [tabs, setTabs] = useState<Tab[]>(DEFAULT_TABS);
  const [activeTabId, setActiveTabId] = useState<string>('tab-1');
  const [opacity, setOpacity] = useState<number>(0.92);
  const [isGhostMode, setIsGhostMode] = useState<boolean>(false);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [canGoForward, setCanGoForward] = useState<boolean>(false);

  // Sync IPC ghost mode
  useEffect(() => {
    const cleanup = window.floatDeck?.onGhostModeChanged((ghostState) => {
      setIsGhostMode(ghostState);
    });
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  // Keyboard navigation for tabs (Ctrl + 1..9)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && !e.shiftKey && !e.altKey) {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= tabs.length) {
          e.preventDefault();
          setActiveTabId(tabs[num - 1].id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tabs]);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const handleSelectTab = (id: string) => {
    setActiveTabId(id);
  };

  const handleAddTab = (preset?: 'youtube' | 'docs' | 'ai' | 'localhost') => {
    let title = 'New Tab';
    let url = 'https://www.google.com';

    if (preset === 'youtube') {
      title = 'YouTube';
      url = 'https://www.youtube.com';
    } else if (preset === 'docs') {
      title = 'React Docs';
      url = 'https://react.dev';
    } else if (preset === 'ai') {
      title = 'ChatGPT';
      url = 'https://chatgpt.com';
    } else if (preset === 'localhost') {
      title = 'localhost:3000';
      url = 'http://localhost:3000';
    }

    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      title,
      url,
      preset: preset || 'custom',
    };

    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTab.id);
  };

  const handleCloseTab = (id: string) => {
    if (tabs.length <= 1) return;
    const nextTabs = tabs.filter((t) => t.id !== id);
    setTabs(nextTabs);
    if (activeTabId === id) {
      setActiveTabId(nextTabs[0].id);
    }
  };

  const handleUpdateTab = (id: string, updates: Partial<Tab>) => {
    setTabs((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const handleNavigate = (url: string) => {
    handleUpdateTab(activeTabId, { url });
    // Also update webview src directly
    const webviews = document.querySelectorAll('webview');
    webviews.forEach((wv: any) => {
      if (wv.getAttribute('src') === activeTab?.url) {
        wv.loadURL(url);
      }
    });
  };

  const handleReload = () => {
    const webviews = document.querySelectorAll('webview');
    webviews.forEach((wv: any) => {
      if (wv.getAttribute('src') === activeTab?.url) {
        wv.reload();
      }
    });
  };

  const handleGoBack = () => {
    const webviews = document.querySelectorAll('webview');
    webviews.forEach((wv: any) => {
      if (wv.getAttribute('src') === activeTab?.url && wv.canGoBack()) {
        wv.goBack();
      }
    });
  };

  const handleGoForward = () => {
    const webviews = document.querySelectorAll('webview');
    webviews.forEach((wv: any) => {
      if (wv.getAttribute('src') === activeTab?.url && wv.canGoForward()) {
        wv.goForward();
      }
    });
  };

  const handleOpacityChange = (newVal: number) => {
    setOpacity(newVal);
    window.floatDeck?.setOpacity(newVal);
  };

  const handleToggleGhostMode = () => {
    const next = !isGhostMode;
    setIsGhostMode(next);
    window.floatDeck?.setGhostMode(next);
  };

  return (
    <div
      className={`h-full w-full flex flex-col rounded-xl overflow-hidden border transition-all duration-200 ${
        isGhostMode
          ? 'border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
          : 'border-cyan-500/40 shadow-2xl'
      } bg-deck-bg`}
    >
      <TitleBar
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={handleSelectTab}
        onAddTab={() => handleAddTab()}
        onCloseTab={handleCloseTab}
        isGhostMode={isGhostMode}
      />

      <NavigationBar
        currentUrl={activeTab?.url || ''}
        onNavigate={handleNavigate}
        onReload={handleReload}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
      />

      <BrowserViewport
        tabs={tabs}
        activeTabId={activeTabId}
        onUpdateTab={handleUpdateTab}
        onCanGoBackChange={setCanGoBack}
        onCanGoForwardChange={setCanGoForward}
      />

      <ControlToolbar
        opacity={opacity}
        onOpacityChange={handleOpacityChange}
        isGhostMode={isGhostMode}
        onToggleGhostMode={handleToggleGhostMode}
        onAddPresetTab={handleAddTab}
      />
    </div>
  );
}
