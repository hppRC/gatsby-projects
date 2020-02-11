import { PluginOptions } from 'gatsby';

export const withDefault = (themeOptions: PluginOptions) => {
  const {
    basePath = '/',
    blogPath = '/blog',
    contentsPath = 'contents',
    tagsPath = '/tags',
    externalLinks = [],
    navigation = [],
    showLineNumbers = true
  } = themeOptions;

  return {
    basePath,
    blogPath,
    contentsPath,
    tagsPath,
    externalLinks,
    navigation,
    showLineNumbers
  };
};

export default withDefault;
