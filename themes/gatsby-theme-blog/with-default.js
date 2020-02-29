const defaultLightTheme = {
  color: '#13131f',
  backgroundColor: '#ffffff',
  cardBackground: 'transparent',
  cardBoxShadow: '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff',
  codeBackground: '#09090f',
  headingBorder: 'solid 0.25rem #3f8efc',
  tocBackground: '#d9d9d9'
};

const defaultDarkTheme = {
  color: '#f5f5f5',
  backgroundColor: '#09090f',
  cardBackground: '#13131f',
  cardBoxShadow: '5px 5px 10px #00000f, -5px -5px 10px #13131f',
  codeBackground: '#131313',
  headingBorder: 'solid 0.3rem #3f8efc',
  tocBackground: '#13131f'
};

module.exports = themeOptions => {
  const {
    siteTitle = 'hpp blog',
    siteUrl = 'https://blog.hpprc.com',
    siteDescription = 'personal blog made with Gatsby, TypeScript.',
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
