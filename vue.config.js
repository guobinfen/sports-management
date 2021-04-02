const path = require('path')

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.join(__dirname, './src'))
    config.resolve.alias.set('styles', path.join(__dirname, './src/assets/styles'))
    config.resolve.alias.set('common', path.join(__dirname, './src/common'))
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {
          '^/api': '/mock'
        }
      }
    }
  }
}
