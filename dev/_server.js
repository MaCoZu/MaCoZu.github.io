// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url);
    const fileExt = path.extname(filePath);

    switch (fileExt) {
        case '.js':
            res.setHeader('Content-Type', 'application/javascript');
            break;
        case '.css':
            res.setHeader('Content-Type', 'text/css');
            break;
        default:
            res.setHeader('Content-Type', 'text/html');
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.end('File not found');
        } else {
            res.end(data);
        }
    });
});

server.listen(5173, () => {
    console.log('Server listening on port 5173');
});