import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Serve static assets with extension fallback for .html and .htm
app.use(express.static(__dirname, { extensions: ['html', 'htm'] }));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback handling
app.use((req, res) => {
  // If asset/file request with extension, return 404 rather than HTML
  if (path.extname(req.path)) {
    return res.status(404).send('Not Found');
  }

  // Check if a .html or .htm file exists for this route
  const cleanPath = req.path.replace(/^\/|\/$/g, '');
  const htmlPath = path.join(__dirname, `${cleanPath}.html`);
  const htmPath = path.join(__dirname, `${cleanPath}.htm`);

  if (cleanPath && fs.existsSync(htmlPath)) {
    return res.sendFile(htmlPath);
  }
  if (cleanPath && fs.existsSync(htmPath)) {
    return res.sendFile(htmPath);
  }

  // Default fallback to index.html
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
