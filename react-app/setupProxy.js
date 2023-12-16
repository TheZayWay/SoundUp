const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    console.log('running proxy setup')
    // if (process.env.NODE_ENV === 'development') {
        app.use('/api', createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true
        }))
    // }
}