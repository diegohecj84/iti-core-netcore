module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  pluginOptions: {
    i18n: {
      locale: 'es',
      fallbackLocale: 'es',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    performance: {
      maxEntrypointSize: 4096000,
      maxAssetSize: 4096000
    }
  },
  transpileDependencies: ['vuex-module-decorators']
}
