module.exports = themeOptions => {
  const {
    siteTitle = 'hpp blog',
    siteUrl = 'https://blog.hpprc.com',
    siteDescription = 'personal blog made with Gatsby, TypeScript.',
    basePath = '/',
    blogPath = '/blog',
    tagsPath = '/tags',
    assetsPath = 'contents/assets',
    postsPath = 'contents/posts',
    gatsbyRemarkPlugins = [],
    mdx = true,
    webpackBundleAnalyzer = true,
    iconPath = './contents/assets/icon.png',
    googleAnalyticsTrackingId = 'UA-149661454-2',
    backgroundColor = '#ffffff',
    themeColor = '#09090f'
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
    themeColor
  };
};
