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
  const { contentsPath } = withDefault(themeOptions);
  const { mdx = true } = themeOptions;

  return {
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `posts`,
          path: `${contentsPath}/posts`
        }
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `assets`,
          path: `${contentsPath}/assets`
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
                linkImagesToOriginal: true
              }
            }
          ],
          plugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 960,
                quality: 90,
                linkImagesToOriginal: true
              }
            }
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
