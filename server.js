const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.url}`);
  let urlPath = req.url.split('?')[0]; // Remove query params
  if (urlPath === '/') {
    urlPath = '/index.html';
  }
  
  let filePath = path.join(PUBLIC_DIR, urlPath);
  
  fs.stat(filePath, (err, stats) => {
    if (err) {
      if (!path.extname(filePath)) {
        filePath += '.html';
        fs.stat(filePath, (err2) => {
          if (err2) {
            res.writeHead(404);
            res.end('File not found');
            return;
          }
          serveFile(filePath, res);
        });
        return;
      }
      res.writeHead(404);
      res.end('File not found');
      return;
    }
    
    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    
    serveFile(filePath, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if(error.code === 'ENOENT'){
        res.writeHead(404);
        res.end('Not found');
      } else {
        res.writeHead(500);
        res.end('Server error: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}

server.listen(PORT, () => {
  console.log(`Static server running on port ${PORT}`);
});
