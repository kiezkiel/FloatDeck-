# 🛸 FloatDeck

> **The sleek, transparent floating multi-tab HUD browser designed for developers with single-monitor setups.**

FloatDeck solves the single-monitor developer struggle: keep **YouTube tutorials**, **Stack Overflow**, **official documentation**, **ChatGPT**, and your **`localhost:3000`** visible in an unobtrusive, always-on-top HUD window without ever squishing your IDE into a cramped 50/50 split.

---

## 📸 In Action (Proof of Concept)

### 1. YouTube Tutorial Floating Over Fullscreen Python Editor
Keep your tutorial video playing with live subtitles while writing code in your full-width editor:
![FloatDeck YouTube Demo](docs/screenshots/floatdeck-youtube-demo.png)

### 2. Instant Stack Overflow & Docs Reference
Search errors, read answers, and follow code solutions side-by-side without Alt-Tabbing:
![FloatDeck Stack Overflow Demo](docs/screenshots/floatdeck-stackoverflow-demo.png)

---

## ✨ Killer Features

* 💻 **Full-Width IDE Workspace**: Your editor stays 100% full screen. No more awkward line wraps or squished splits.
* 🌐 **Any Web Tab (Not Just Video)**: Unlike standard video PiP, FloatDeck is a full Chromium web engine. Browse YouTube, Stack Overflow, MDN, React Docs, ChatGPT, and `localhost:3000` with zero `X-Frame-Options` blocking.
* 👻 **Ghost Mode (`Alt + G`)**: Clicks pass straight *through* the HUD into your code underneath. You can type and click in your editor uninterrupted while watching tutorials.
* 👁️ **Live Opacity Control**: Slide between 15% and 100% transparency on the fly so you can see through the HUD to code underneath.
* ⚡ **Corner Snapping**: One-click snap to Top-Right (`↗`), Bottom-Right (`↘`), or Top-Left (`↖`).
* ⌨️ **Global Hotkeys**:
  * `Alt + \` : Instant Summon / Dismiss toggle from anywhere.
  * `Alt + G` : Toggle Ghost Click-Through mode.
  * `Ctrl + 1..9` : Instant Tab switching.

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

# Launch FloatDeck
npm run dev
```

---

## 🎮 Shortcut Cheat Sheet

| Shortcut | Action |
| :--- | :--- |
| **`Alt + G`** | **Toggle Ghost Mode** (Click-through pass-through) |
| **`Alt + \`** | **Show / Hide FloatDeck** instantly |
| **`Ctrl + 1..9`** | Switch between open tabs |
| **Header Drag** | Drag anywhere on the top bar to move window |
| **`↗` `↘` `↖`** | Quick snap to monitor corners |

---

## 🛠️ Tech Stack

* **Framework**: Electron + Vite
* **Frontend**: React 18, TypeScript, Tailwind CSS
* **Icons**: Lucide React
* **Window Engine**: Frameless Win32 acrylic window with `alwaysOnTop: 'screen-saver'`, dynamic opacity, and `setIgnoreMouseEvents` click-through.

---

## 📄 License
MIT © 2026 FloatDeck Contributors
