# Forge

**Visual theme editor for [shadcn/ui](https://ui.shadcn.com).** Pick colors, fonts, radius, and mode — see every shadcn component update live. Export CSS variables, Tailwind config, `components.json`, or a ready-to-paste AI prompt.

- **Live preview** — Real shadcn components in an iframe; theme updates in &lt;100ms via CSS variables
- **No account** — Share your theme with a URL; config is encoded in query params
- **Export** — Copy CSS variables, Tailwind v4 `@theme` block, `components.json`, or an **AI Prompt** for Claude Projects / Cursor rules

Built with Next.js, [shadcn/ui](https://ui.shadcn.com), Tailwind CSS v4, and Zustand.

---

## Quick start

```bash
git clone https://github.com/yuyanggu/forge-gtc.git
cd forge-gtc
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## What you can customize

| Control | Options |
|--------|---------|
| **Preset** | Custom, Neutral, Slate, Zinc, Gray, Stone |
| **Base color** | 5 grayscale palettes (neutral, slate, zinc, gray, stone) |
| **Theme color** | 17 accent colors (neutral, red, rose, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, fuchsia, pink) |
| **Radius** | 0, 0.25, 0.375, 0.5, 0.625 (default), 0.75, 1.0 rem |
| **Font** | Inter, DM Sans, Geist, IBM Plex Sans, Manrope, Nunito Sans, Plus Jakarta Sans, Outfit, Raleway, Source Sans 3, Space Grotesk, Work Sans |
| **Preview mode** | Light / Dark (preview only; app shell has its own theme toggle) |
| **Style** | Default / Nova (compact) |

**Try Random** randomizes base color, theme color, radius, and font.

---

## Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+E` (Mac) / `Ctrl+E` (Win) | Open Export dialog |
| `Cmd+D` / `Ctrl+D` | Toggle preview light/dark |
| `Cmd+Shift+R` / `Ctrl+Shift+R` | Randomize theme |

---

## Export

Use the **Export** button in the top bar. The dialog has four tabs:

1. **CSS Variables** — `:root` and `.dark` blocks in OKLCH; copy and paste into your `globals.css`.
2. **Tailwind Config** — Full `@import` + `@theme inline` setup for Tailwind v4.
3. **components.json** — shadcn CLI config (base color, etc.) for new projects.
4. **AI Prompt** — A markdown block with your design system config, CSS variables, Tailwind theme, and rules. Paste into Claude Projects instructions, a `.cursorrules` file, or `CLAUDE.md` so AI-generated components use your exact tokens. Optional project name customizes the heading.

Copy to clipboard is supported on all tabs; a toast confirms the copy.

---

## Share by URL

The current theme is encoded in the URL, e.g.:

```
?base=neutral&theme=blue&radius=0.625&font=Inter&mode=light&style=default
```

Share the link to let others open the same theme. The app hydrates from these params on load and updates the URL on every change (no reload).

---

## Project structure

```
Forge/
├── app/
│   ├── layout.tsx          # Root layout, Inter, ThemeProvider, Toaster
│   ├── page.tsx            # Main editor (topbar + sidebar + preview)
│   ├── globals.css         # Forge app theme (fixed)
│   └── preview/
│       ├── layout.tsx      # Minimal layout for preview route
│       └── page.tsx        # Preview page (loaded in iframe)
├── components/
│   ├── editor/             # Editor UI (sidebar + topbar + dialogs)
│   │   ├── base-color-picker.tsx
│   │   ├── color-picker.tsx
│   │   ├── export-dialog.tsx
│   │   ├── font-picker.tsx
│   │   ├── keyboard-shortcuts.tsx
│   │   ├── mode-toggle.tsx
│   │   ├── preset-selector.tsx
│   │   ├── radius-picker.tsx
│   │   ├── randomize-button.tsx
│   │   ├── style-picker.tsx
│   │   ├── theme-sidebar.tsx
│   │   ├── topbar.tsx
│   │   └── url-sync.tsx
│   ├── preview/
│   │   ├── component-showcase.tsx   # All shadcn sections in preview
│   │   ├── preview-content.tsx     # postMessage listener + style inject
│   │   └── preview-frame.tsx       # Iframe + width toggles
│   └── ui/                 # shadcn components
├── lib/
│   ├── ai-prompt-generator.ts  # AI prompt markdown for export tab
│   ├── colors.ts               # OKLCH → hex (culori)
│   ├── css-generator.ts        # CSS + Tailwind + components.json output
│   ├── store.ts                # Zustand store + URL serialize/parse
│   ├── themes.ts               # Base + theme color palettes (OKLCH)
│   └── utils.ts
├── public/
└── package.json
```

---

## How the preview works

1. The main app renders an **iframe** whose `src` is `/preview` (a Next.js page).
2. The **Zustand store** holds theme config (base color, theme color, radius, font, mode, style).
3. **`lib/css-generator.ts`** turns that config into a full CSS string (`:root` + `.dark`).
4. **`PreviewFrame`** subscribes to the store and, on change, calls `iframe.contentWindow.postMessage({ type: 'forge-theme-update', css, mode, fontUrl, style })`.
5. The **preview page** (`PreviewContent`) listens for that message, updates a `<style id="forge-theme">` tag and the `dark` class on `<html>`, updates the Google Fonts `<link>` for the selected font, and sets `data-style` on the document for Nova (compact) styling.
6. No React re-render in the iframe — only CSS variable and class changes, so updates stay under ~50ms.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Next.js, default port 3000) |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

---

## Tech stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **UI:** [shadcn/ui](https://ui.shadcn.com) + Tailwind CSS v4
- **State:** [Zustand](https://github.com/pmndrs/zustand)
- **Colors:** [culori](https://culori.org) (OKLCH ↔ hex)
- **Theme (app shell):** [next-themes](https://github.com/pacocoursey/next-themes)
- **Icons:** [Lucide](https://lucide.dev)

---

## License

MIT.
