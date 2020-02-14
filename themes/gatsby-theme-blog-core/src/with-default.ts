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
  gatsbyRemarkPlugins: string[];
  mdx: boolean;
};

export const withDefault = (themeOptions: PluginOptions) => {
  const {
    basePath = '/',
    blogPath = '/blog',
    tagsPath = '/tags',
    assetsPath = 'contents/assets',
    postsPath = 'contents/posts',
    templatesPath = 'src/templates',
    externalLinks = [],
    navigations = [],
    showLineNumbers = true,
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
    externalLinks,
    navigations,
    showLineNumbers,
    gatsbyRemarkPlugins,
    mdx,
    ...rest
  } as WithDefaultProps;
};

export default withDefault;
