const defaultLightTheme = {
  color: '#30303f',
  backgroundColor: '#ffffff',
  cardBackground: 'transparent',
  cardBoxShadow: '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff',
  codeBackground: '#09090f',
  headingBorder: 'solid 2px #3f8efc',
  tocBackground: '#d9d9d9'
};

const defaultDarkTheme = {
  color: '#f5f5f5',
  backgroundColor: '#09090f',
  cardBackground: '#13131f',
  cardBoxShadow: '5px 5px 10px #030303, -5px -5px 10px #090909',
  codeBackground: '#131313',
  headingBorder: 'solid 2.5px #3f8efc',
  tocBackground: '#13131f'
};

module.exports = themeOptions => {
  const {
    siteTitle = 'hpp blog',
    siteUrl = 'https://blog.hpprc.com',
    siteDescription = 'personal blog made with Gatsby, TypeScript, emotion.',
    basePath = '/',
    blogPath = '/posts',
    tagsPath = '/tags',
    assetsPath = 'contents/assets',
    postsPath = 'contents/posts',
    gatsbyRemarkPlugins = [],
    mdx = true,
    webpackBundleAnalyzer = true,
    iconPath = './contents/assets/icon.png',
    googleAnalyticsTrackingId = 'UA-XXXXXXXXX-X',
    backgroundColor = '#ffffff',
    themeColor = '#09090f',
    lightTheme = {},
    darkTheme = {}
  } = themeOptions;

  return {
    siteTitle,
    siteUrl,
    siteDescription,
    basePath,
    blogPath,
    assetsPath,
    postsPath,
    tagsPath,
    gatsbyRemarkPlugins,
    mdx,
    webpackBundleAnalyzer,
    iconPath,
    googleAnalyticsTrackingId,
    backgroundColor,
    themeColor,
    lightTheme: { ...defaultLightTheme, ...lightTheme },
    darkTheme: { ...defaultDarkTheme, ...darkTheme }
  };
};
