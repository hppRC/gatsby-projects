const siteMetadata = {
  siteTitle: `hpp blog🌝`,
  siteTitleAlt: `hpp blog - @hppRC/hpp-blog`,
  siteHeadline: `personal blog of @hppRC`,
  siteUrl: `https://blog.hpprc.com`,
  siteDescription: `personal blog made with Gatsby, TypeScript.`,
  siteLanguage: `en`,
  siteImage: `/banner.jpg`,
  author: `@hpp_ricecake`, // twitter account id
  basePath: `/`,
  social: {
    twitter: 'https://twitter.com/hpp_ricecake',
    github: 'https://github.com/hppRC',
    qiita: 'https://qiita.com/hppRC'
  }
};

module.exports = {
  siteMetadata,
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
