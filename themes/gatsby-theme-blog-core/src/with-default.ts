import { PluginOptions } from 'gatsby';

export const withDefault = (themeOptions: PluginOptions) => {
  const {
    basePath = '/',
    blogPath = '/blog',
    postsPath = 'content/posts',
    pagesPath = 'content/posts',
    tagsPath = '/tags',
    externalLinks = [],
    navigation = [],
    showLineNumbers = true
  } = themeOptions;

  console.log('theme options', themeOptions);

  return {
    basePath,
    blogPath,
    postsPath,
    pagesPath,
    tagsPath,
    externalLinks,
    navigation,
    showLineNumbers
  };
};

export default withDefault;
