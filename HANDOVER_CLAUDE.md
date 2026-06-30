# Project Context: Portal de Apoyo Psicoeducativo Post-Terremoto

## 1. Overview
This is a React-based web application designed as an offline-capable, standalone psychoeducational repository. It provides resources (PDFs, activities, guides) for families, schools, and professionals to support children and adolescents post-earthquake.

## 2. Tech Stack
- **Framework**: React 18, built with Vite 5.
- **Routing**: `react-router-dom` (Using **`HashRouter`** to allow routing when the file is opened locally via `file://`).
- **Styling**: Vanilla CSS with a customized soothing color palette (soft blues, mint greens, warm beiges). No Tailwind.
- **Icons**: `lucide-react` (generic icons used, as brand icons are removed from the library).
- **Bundler Plugin**: `vite-plugin-singlefile`. This bundles the entire React app (JS and CSS) into one single HTML file (`Portal_Apoyo_Psicoeducativo.html`) to avoid CORS errors when opening local files offline.

## 3. Architecture & Data
- **Global State**: Handled natively using React Context (`src/store.jsx`). It manages a mock authentication state (admin / apoyo123) and the resources array.
- **File Structure**:
  - `src/components/`: Reusable UI (`Hero`, `Navbar`, `ResourceCard`).
  - `src/pages/`: Main views (`Home`, `Login`, `AdminDashboard`).
  - `public/Material terremoto niños/`: Contains the actual physical PDF files and folders. Vite copies this folder entirely to `dist/` upon build so the standalone HTML can reference the PDFs using relative paths (`./Material terremoto niños/...`).

## 4. How to Build & Run
- **Development**: Run `npm run dev` (starts on localhost:5173).
- **Production Build**: Run `npm run build`. This generates a single `dist/index.html`. We then run `mv dist/index.html dist/Portal_Apoyo_Psicoeducativo.html`. 
- **Offline Viewing**: Go to the `dist` folder and double-click `Portal_Apoyo_Psicoeducativo.html` in Chrome/Safari.

---

# Prompt for Claude Code

*Copy and paste the text below to your Claude Code prompt to seamlessly continue development:*

```text
Act as an expert Full-Stack React Developer. I am handing over a project called "Portal de Apoyo Psicoeducativo Post-Terremoto".

### Context:
This is a React (Vite 5) application styled with Vanilla CSS. It's designed to be distributed as a standalone HTML file that can be opened offline (via `file://`). 
To achieve this, we use `HashRouter` for navigation and `vite-plugin-singlefile` to inline all JS/CSS. Real PDF resources are stored in `public/Material terremoto niños` so they are exported to `dist/` and linked via relative paths. Global state is managed via React Context in `src/store.jsx`.

### Your Task:
[INSERT YOUR SPECIFIC REQUEST HERE - e.g., "Add a new page for X", "Fix a bug in Y component", "Change the primary color to Z"].

### Rules for this codebase:
1. DO NOT change `HashRouter` to `BrowserRouter`, or the offline local build will break.
2. If adding new files/assets (like PDFs or images), put them in the `public/` directory so they are copied to `dist/` correctly.
3. When building, remember the custom output file is generated via `npm run build && mv dist/index.html dist/Portal_Apoyo_Psicoeducativo.html`.
4. Keep all UI text and dummy data strictly in Spanish. Maintain the empathetic, soothing tone and UI color variables defined in `index.css`.
```
