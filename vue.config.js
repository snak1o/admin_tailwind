module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: process.env.BASE_URL,
                ws: true,
                changeOrigin: true
            },
        }
    }
}