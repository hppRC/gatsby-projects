module.exports = themeOptions => {
  const {
    siteTitle = 'hpp core',
    siteUrl = 'https://hpprc.com',
    siteDescription = 'core functions for Gatsby site',
    iconPath = './contents/assets/icon.png',
    googleAnalyticsTrackingId = 'UA-XXXXXXXXX-X',
    backgroundColor = '#ffffff',
    themeColor = '#09090f'
  } = themeOptions;

  return {
    siteTitle,
    siteUrl,
    siteDescription,
    iconPath,
    googleAnalyticsTrackingId,
    backgroundColor,
    themeColor
  };
};
