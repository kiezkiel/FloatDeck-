import React, { useEffect, useRef } from 'react';
import { Tab } from '../types';

interface BrowserViewportProps {
  tabs: Tab[];
  activeTabId: string;
  onUpdateTab: (id: string, updates: Partial<Tab>) => void;
  onCanGoBackChange: (canGoBack: boolean) => void;
  onCanGoForwardChange: (canGoForward: boolean) => void;
}

export const BrowserViewport: React.FC<BrowserViewportProps> = ({
  tabs,
  activeTabId,
  onUpdateTab,
  onCanGoBackChange,
  onCanGoForwardChange,
}) => {
  const webviewRefs = useRef<Record<string, any>>({});

  const activeTab = tabs.find((t) => t.id === activeTabId);

  useEffect(() => {
    tabs.forEach((tab) => {
      const el = webviewRefs.current[tab.id];
      if (!el) return;

      const handleDidNavigate = (e: any) => {
        onUpdateTab(tab.id, { url: e.url });
        if (tab.id === activeTabId && el.canGoBack && el.canGoForward) {
          onCanGoBackChange(el.canGoBack());
          onCanGoForwardChange(el.canGoForward());
        }
      };

      const handlePageTitleUpdated = (e: any) => {
        if (e.title) {
          onUpdateTab(tab.id, { title: e.title });
        }
      };

      el.addEventListener('did-navigate', handleDidNavigate);
      el.addEventListener('page-title-updated', handlePageTitleUpdated);

      return () => {
        el.removeEventListener('did-navigate', handleDidNavigate);
        el.removeEventListener('page-title-updated', handlePageTitleUpdated);
      };
    });
  }, [tabs, activeTabId]);

  return (
    <div className="relative flex-1 w-full h-full bg-deck-bg overflow-hidden">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <div
            key={tab.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-100 ${
              isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Native Electron Webview */}
            <webview
              ref={(el) => {
                if (el) webviewRefs.current[tab.id] = el;
              }}
              src={tab.url}
              className="w-full h-full border-none bg-slate-950"
              // @ts-ignore
              allowpopups="true"
            />
          </div>
        );
      })}
    </div>
  );
};
