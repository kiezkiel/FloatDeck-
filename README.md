# 🛸 FloatDeck

> The sleek, transparent floating multi-tab HUD browser designed for developers with single-monitor setups.

FloatDeck lets you keep YouTube tutorials, official documentation, ChatGPT, and your `localhost:3000` visible in an unobtrusive, always-on-top window while coding full-screen in your editor.

![FloatDeck Banner](https://img.shields.io/badge/Platform-Windows-blue?style=flat-square)
![Stack](https://img.shields.io/badge/Stack-Electron%20%7C%20React%20%7C%20Tailwind%20%7C%20Vite-cyan?style=flat-square)

---

## ✨ Key Features

* **Full-Screen Coding Without Compromise**: Never squish your IDE code into a cramped 50/50 split again.
* **Any Web Tab (Not Just Video)**: Powered by Chromium `<webview>`, rendering YouTube, MDN Docs, React Docs, ChatGPT, and `localhost:3000` with zero `X-Frame-Options` blocking.
* **Ghost Mode (Click-Through)**: Tap `Alt + G` and your mouse clicks pass straight through the HUD into your editor underneath.
* **Live Opacity Slider**: Adjust window transparency from 15% to 100% on the fly.
* **Global Hotkeys**:
  * `Alt + \` : Instant Show / Hide toggle.
  * `Alt + G` : Toggle Ghost Mode (click-through).
  * `Ctrl + 1..9` : Quick Tab switching.
* **Corner Snapping**: One-click snap to Top-Right, Bottom-Right, Top-Left, or Bottom-Left.

---

## 🚀 Quick Start

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+)
* Git

### Installation

```bash
# Clone the repository
git clone https://github.com/kiezkiel/FloatDeck-.git
cd FloatDeck-

# Install dependencies
npm install

# Run development mode
npm run dev
```

---

## 🛠️ Architecture

* **Framework**: Electron + Vite
* **Frontend**: React 18, TypeScript, Tailwind CSS
* **Icons**: Lucide React
* **Window Engine**: Transparent frameless Win32 window with `alwaysOnTop: 'screen-saver'` and `setIgnoreMouseEvents` click-through support.

---

## 📄 License
MIT © 2026 FloatDeck Contributors
