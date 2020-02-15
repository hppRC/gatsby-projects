module.exports = {
  plugins: [
    {
      resolve: `@hpprc/gatsby-theme-blog-core`,
      options: {
        basePath: '/',
        blogPath: '/blog',
        tagsPath: '/tags',
        assetsPath: 'contents/assets',
        postsPath: 'contents/posts',
        templatesPath: 'src/templates',
        externalLinks: [],
        navigations: [],
        showLineNumbers: true,
        gatsbyRemarkPlugins: [],
        mdx: true
      }
    }
  ]
};
