module.exports = themeOptions => {
  const {
    basePath = '/',
    blogPath = '/blog',
    tagsPath = '/tags',
    assetsPath = 'contents/assets',
    postsPath = 'contents/posts',
    gatsbyRemarkPlugins = [],
    mdx = true,
    ...rest
  } = themeOptions;

  return {
    basePath,
    blogPath,
    assetsPath,
    postsPath,
    tagsPath,
    gatsbyRemarkPlugins,
    mdx,
    ...rest
  };
};
