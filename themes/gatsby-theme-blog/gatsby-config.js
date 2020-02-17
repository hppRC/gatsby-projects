const withDefault = require('./with-default');

module.exports = themeOptions => {
  const { siteTitle, siteUrl, postsPath, assetsPath, mdx, gatsbyRemarkPlugins, iconPath } = withDefault(themeOptions);

  return {
    plugins: [
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      `gatsby-plugin-typescript`,
      `gatsby-plugin-root-import`,
      `gatsby-plugin-offline`,
      `gatsby-plugin-lodash`,
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
      {
        resolve: `gatsby-plugin-webpack-bundle-analyzer`,
        options: {
          openAnalyzer: false
        }
      },
      `gatsby-plugin-netlify`,
      `gatsby-plugin-netlify-cache`,
      `gatsby-plugin-react-helmet`,
      {
        resolve: `gatsby-plugin-react-helmet-canonical-urls`,
        options: {
          siteUrl: 'config.siteUrl'
        }
      },
      `gatsby-plugin-advanced-sitemap`,
      {
        resolve: `gatsby-plugin-robots-txt`,
        options: {
          host: 'config.siteUrl',
          sitemap: `${siteUrl}/sitemap.xml`,
          policy: [{ userAgent: `*`, allow: `/` }]
        }
      },
      {
        resolve: `gatsby-plugin-feed`,
        options: {
          query: `
          {
            site {
              siteMetadata {
                siteTitle
                siteDescription
                siteUrl
              }
            }
          }
        `,
          feeds: [
            {
              serialize: ({ query: { site, allMdx } }) => {
                const { siteUrl } = site.siteMetadata;
                return allMdx.nodes.map(({ excerpt, body, frontmatter }) => {
                  const { slug, date } = frontmatter;
                  return Object.assign({}, frontmatter, {
                    description: excerpt,
                    date: date,
                    url: `${siteUrl}/posts/${slug}`,
                    guid: `${siteUrl}/posts/${slug}`,
                    custom_elements: [{ 'content:encoded': body }]
                  });
                });
              },
              query: `
              {
                allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
                  nodes {
                    excerpt
                    body
                    frontmatter {
                      title
                      date
                      slug
                    }
                  }
                }
              }
            `,
              output: `/rss.xml`,
              title: `${siteTitle} RSS feed`
            }
          ]
        }
      },
      {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          // replace "UA-XXXXXXXXX-X" with your own Tracking ID
          trackingId: `UA-149661454-2`
        }
      },
      // gatsby-plugin-manifest should be described before gatsby-plugin-offline
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `name`,
          short_name: `hpp`,
          description: `description`,
          Scope: `/`,
          start_url: `/?utm_source=homescreen`,
          background_color: `#ffffff`,
          theme_color: `#09090f`,
          display: `standalone`,
          icon: iconPath
        }
      },
      `gatsby-plugin-offline`
    ].filter(Boolean)
  };
};
