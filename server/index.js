const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require('http-proxy-middleware');
const multer = require("multer");
const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static(path.join(__dirname, '../client/build')));

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Request headers:', req.headers);
    next();
});

app.use('/api', createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/', // remove /api prefix when forwarding to python server
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request:', req.method, req.url, 'to', proxyReq.path);
        console.log('Proxy request headers:', proxyReq.getHeaders());
    },
    onProxyRes: (proxyRes, req, res) => {
        console.log('Received proxy response:', proxyRes.statusCode, req.url);
        console.log('Proxy response headers:', proxyRes.headers);
    },
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
    }
}));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).send('Something went wrong');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Node.js server running on port ${PORT}`);
});

