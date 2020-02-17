module.exports = themeOptions => {
  const {
    siteTitle = 'Your Site Title',
    siteUrl = 'https://blog.hpprc.com',
    basePath = '/',
    blogPath = '/blog',
    tagsPath = '/tags',
    assetsPath = 'contents/assets',
    postsPath = 'contents/posts',
    gatsbyRemarkPlugins = [],
    mdx = true,
    iconPath = './contents/assets/icon.png',
    ...rest
  } = themeOptions;

  return {
    siteTitle,
    siteUrl,
    basePath,
    blogPath,
    assetsPath,
    postsPath,
    tagsPath,
    gatsbyRemarkPlugins,
    mdx,
    iconPath,
    ...rest
  };
};
