// you should write require('ts-node').register once in projects's gatsby-*.js
'use strict';
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2019'
  }
});

const withDefault = require('./src/with-default').withDefault;

module.exports = themeOptions => {
  const options = withDefault(themeOptions);
  const { mdx = true } = themeOptions;

  return {
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: options.postsPath,
          path: options.postsPath
        }
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: options.pagesPath,
          path: options.pagesPath
        }
      },
      mdx && {
        resolve: `gatsby-plugin-mdx`,
        options: {
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 960,
                quality: 90,
                linkImagesToOriginal: false
              }
            }
          ],
          plugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 960,
                quality: 90,
                linkImagesToOriginal: false
              }
            }
          ]
        }
      },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      `gatsby-plugin-typescript`
    ].filter(Boolean)
  };
};
