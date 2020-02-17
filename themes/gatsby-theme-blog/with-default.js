module.exports = themeOptions => {
  const {
    basePath = '/',
    blogPath = '/blog',
    tagsPath = '/tags',
    assetsPath = 'contents/assets',
    postsPath = 'contents/posts',
    templatesPath = 'src/templates',
    gatsbyRemarkPlugins = [],
    mdx = true,
    ...rest
  } = themeOptions;

  return {
    basePath,
    blogPath,
    assetsPath,
    postsPath,
    templatesPath,
    tagsPath,
    gatsbyRemarkPlugins,
    mdx,
    ...rest
  };
};
