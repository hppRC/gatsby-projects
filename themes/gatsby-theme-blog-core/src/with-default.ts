import { PluginOptions } from 'gatsby';

type WithDefaultProps = {
  basePath: string;
  blogPath: string;
  assetsPath: string;
  postsPath: string;
  templatesPath: string;
  tagsPath: string;
  externalLinks: string[];
  navigations: string[];
  showLineNumbers: boolean;
};

export const withDefault = (themeOptions: PluginOptions) => {
  const {
    basePath = '/',
    blogPath = '/blog',
    assetsPath = 'contents/assets',
    postsPath = 'contents/posts',
    templatesPath = 'src/templates',
    tagsPath = '/tags',
    externalLinks = [],
    navigations = [],
    showLineNumbers = true,
    ...rest
  } = themeOptions;

  return {
    basePath,
    blogPath,
    assetsPath,
    postsPath,
    templatesPath,
    tagsPath,
    externalLinks,
    navigations,
    showLineNumbers,
    ...rest
  } as WithDefaultProps;
};

export default withDefault;
