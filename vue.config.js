module.exports = {
  pwa: {
    name: 'Weather Vue App',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    themeColor: '#e0a7a1',
    msTileColor: '#b7dcd5',
    workboxPluginMode: 'GenerateSW',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      msTileImage: 'img/icons/mstile-150x150.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
    },
  },
  lintOnSave: false,
};
