# 🤖 Local AI Guide: June 2026

An interactive guide to running AI models locally as a backup for ChatGPT, Claude, and Gemini. Covers model comparisons and benchmarks, a Claude Code + Ollama setup tutorial, and a hardware analyzer.

**[Live Demo →](https://timothy22000.github.io/local-ai-guide)**

## Features

- **SOTA Gap Analysis**: Visual comparison of open-weight vs frontier closed models
- **Model Leaderboard**: June 2026 benchmarks (SWE-bench, LiveCodeBench) for 13+ models
- **Claude Code Setup**: Native Ollama v0.14+ integration guide
- **Step-by-Step Tutorial**: Install Ollama, pull a model, verify it, and wire it into Claude Code, per OS
- **Interactive Hardware Analyzer**: Enter your GPU/RAM/use case, get personalized recommendations
- **Mobile Responsive**: Works on all screen sizes

## Tech Stack

- React 18
- Tailwind CSS
- Lucide React icons
- GitHub Pages deployment

## Quick Start

```bash
# Clone the repo
git clone https://github.com/timothy22000/local-ai-guide.git
cd local-ai-guide

# Install dependencies
npm install

# Start dev server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to GitHub Pages

### Option 1: GitHub Actions (Recommended)

The repo includes a GitHub Actions workflow that auto-deploys on push to `main`.

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/timothy22000/local-ai-guide.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repo → Settings → Pages
   - Source: **GitHub Actions**
   - The workflow will build and deploy automatically

3. **Your site will be live at:**
   ```
   https://timothy22000.github.io/local-ai-guide
   ```

### Option 2: Manual Deploy with gh-pages

1. **Update `homepage` in `package.json`:**
   ```json
   "homepage": "https://timothy22000.github.io/local-ai-guide"
   ```

2. **Deploy:**
   ```bash
   npm run deploy
   ```

3. **Enable GitHub Pages:**
   - Go to your repo → Settings → Pages
   - Source: **Deploy from a branch**
   - Branch: `gh-pages` / `/ (root)`

## Project Structure

```
local-ai-guide/
├── public/
│   └── index.html          # HTML template with fonts
├── src/
│   ├── App.jsx             # Main app (all components)
│   ├── index.js             # React entry point
│   └── index.css            # Tailwind imports + custom styles
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions auto-deploy
├── package.json             # Dependencies + scripts
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
└── README.md                # This file
```

## Customization

### Forking this guide

If you fork it, search and replace `timothy22000` with your own GitHub username in:
- `package.json` → `homepage` field
- `README.md` → Live demo link

### Add/Edit Models

Models are defined as arrays in `src/App.jsx`:
- `frontierModels`: Large models needing cloud/multi-GPU
- `localModels`: Models that run on consumer hardware
- `MODEL_DB`: Used by the hardware analyzer
- `GPU_DB`: GPU database for the analyzer

### Customize Design

The site uses a light editorial aesthetic (think The Atlantic), defined as semantic colors in `tailwind.config.js`:
- Background: `paper` (#fdfcf9), section bands `paper2`
- Cards: `white` with `rule` hairline borders
- Accent: `accent` (#c0271f, red); secondary `navy` (#2f4858)
- Fonts: Playfair Display (headlines), Spectral (body), Inter (labels)

## Data Sources

- [Epoch AI](https://epoch.ai/): Open vs closed frontier gap analysis
- [NIST CAISI](https://nist.gov/): Independent model evaluations
- [LM Arena](https://lmarena.ai/): Human preference rankings
- Vendor benchmarks: SWE-bench, LiveCodeBench, GPQA Diamond

## License

MIT: feel free to fork, modify, and share.

## Contributing

Pull requests welcome! If you have updated benchmark data, GPU pricing, or new model information, please open a PR.
