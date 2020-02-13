import { PluginOptions } from 'gatsby';

import { withDefault } from './src';

const safeRemarkPlugins = (gatsbyRemarkPlugins: unknown) => {
  return typeof gatsbyRemarkPlugins === 'undefined' ? [] : (gatsbyRemarkPlugins as unknown[]);
};

export default (themeOptions: PluginOptions) => {
  const { postsPath, assetsPath } = withDefault(themeOptions);
  const { mdx = true, gatsbyRemarkPlugins } = themeOptions;

  return {
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `posts`,
          path: postsPath
        }
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `assets`,
          path: assetsPath
        }
      },
      mdx && {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [`.mdx`, `.md`],
          gatsbyRemarkPlugins: [
            `gatsby-remark-relative-images`,
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 1400,
                quality: 90,
                linkImagesToOriginal: true
              }
            },
            ...safeRemarkPlugins(gatsbyRemarkPlugins)
          ]
        }
      },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      `gatsby-plugin-typescript`,
      `gatsby-plugin-root-import`,
      `gatsby-plugin-offline`,
      `gatsby-plugin-lodash`
    ].filter(Boolean)
  } as const;
};
