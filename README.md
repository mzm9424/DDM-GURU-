# DDmGurU | d'Manifestor Portfolio

Official portfolio website for **DDmGurU (d'Manifestor)**, hosted at [ddmguru.com](https://ddmguru.com).

## 🚀 Live Website & Deployment

- **Custom Domain**: [ddmguru.com](https://ddmguru.com)
- **Deployment**: Automatic GitHub Pages deployment configured via `.github/workflows/static.yml`. Every commit pushed to the `main` branch automatically deploys to production.

---

## 🛠️ Features & Stack

- **Static Multi-page Architecture**: Built with clean, standards-compliant HTML5, CSS3, and JavaScript.
- **Theme Switcher**: Complete Dark / Light mode toggle with:
  - Navbar button in desktop and mobile headers
  - Bottom-left floating quick-toggle dock
  - System preference detection (`prefers-color-scheme`)
  - Instant theme persistence via `localStorage` (zero FOUC flash)
- **Local & AI Studio Dev Server**: Optional Node.js Express server (`server.js`) on port 3000 for instant local previews and cloud editing.

---

## 🔄 AI Studio to GitHub Workflow

### Option 1: Direct Push from Local Clone
If you are syncing updates between AI Studio and GitHub on your machine:
```bash
# 1. Check changed files
git status

# 2. Stage changes (excluding node_modules as defined in .gitignore)
git add .

# 3. Commit the changes
git commit -m "Update website theme switcher and responsiveness"

# 4. Push to main branch (triggers automatic GitHub Pages deployment)
git push origin main
```

### Option 2: AI Studio GitHub Sync
If using AI Studio's repository integration, use the **Export / Push to GitHub** feature in the top project navigation to create a commit or pull request directly to `dmanifestor/ddmguru`.

---

## 💻 Local Development

To run the local preview server:
```bash
npm install
npm start
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.
