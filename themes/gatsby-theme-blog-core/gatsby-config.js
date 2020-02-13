// you should write require('ts-node').register once in projects's gatsby-*.js
'use strict';
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2019'
  }
});

const { withDefault } = require('./src/with-default');

module.exports = themeOptions => {
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
            ...gatsbyRemarkPlugins
          ]
        }
      },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      `gatsby-plugin-typescript`,
      `gatsby-plugin-root-import`
    ].filter(Boolean)
  };
};
