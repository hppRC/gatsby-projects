import { PluginOptions } from 'gatsby';

export const withDefault = (themeOptions: PluginOptions) => {
  const {
    basePath = '/',
    blogPath = '/blog',
    assetsPath = 'contents/assets',
    postsPath = 'contents/posts',
    tagsPath = '/tags',
    externalLinks = [],
    navigation = [],
    showLineNumbers = true
  } = themeOptions;

  return {
    basePath,
    blogPath,
    assetsPath,
    postsPath,
    tagsPath,
    externalLinks,
    navigation,
    showLineNumbers
  };
};

export default withDefault;
