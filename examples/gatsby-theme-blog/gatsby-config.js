const siteMetadata = {
  siteTitle: `hpp blog🌝`,
  siteTitleAlt: `hpp blog - @hppRC/hpp-blog`,
  siteHeadline: `personal blog of @hppRC`,
  siteUrl: `https://blog.hpprc.com`,
  siteDescription: `personal blog made with Gatsby, TypeScript.`,
  siteLanguage: `ja`,
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
  siteMetadata, //this is needed!
  plugins: [
    {
      resolve: `@hpprc/gatsby-theme-blog`,
      options: {
        siteTitle: 'hpp blog',
        siteUrl: 'https://blog.hpprc.com',
        siteDescription: 'personal blog made with Gatsby, TypeScript, emotion.',
        basePath: '/',
        blogPath: '/posts',
        tagsPath: '/tags',
        assetsPath: 'contents/assets',
        postsPath: 'contents/posts',
        gatsbyRemarkPlugins: [],
        mdx: true,
        webpackBundleAnalyzer: true,
        iconPath: './contents/assets/icon.png',
        googleAnalyticsTrackingId: 'UA-XXXXXXXXX-X',
        backgroundColor: '#ffffff',
        themeColor: '#09090f',
        lightTheme: {
          color: '#30303f',
          backgroundColor: '#ffffff',
          cardBackground: 'transparent',
          cardBoxShadow: '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff',
          codeBackground: '#09090f',
          headingBorder: 'solid 0.25rem #3f8efc',
          tocBackground: '#d9d9d9'
        },
        darkTheme: {
          color: '#f5f5f5',
          backgroundColor: '#09090f',
          cardBackground: '#13131f',
          cardBoxShadow: '5px 5px 10px #030303, -5px -5px 10px #090909',
          codeBackground: '#131313',
          headingBorder: 'solid 0.3rem #3f8efc',
          tocBackground: '#13131f'
        }
      }
    }
  ]
};
