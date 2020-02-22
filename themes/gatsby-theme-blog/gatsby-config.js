const withDefault = require('./with-default');

module.exports = themeOptions => {
  const {
    siteTitle,
    siteUrl,
    siteDescription,
    postsPath,
    blogPath,
    assetsPath,
    mdx,
    webpackBundleAnalyzer,
    gatsbyRemarkPlugins,
    iconPath,
    googleAnalyticsTrackingId,
    backgroundColor,
    themeColor
  } = withDefault(themeOptions);

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
            {
              resolve: `gatsby-remark-autolink-headers`,
              options: {
                offsetY: `300`,
                icon: false,
                className: `autolink-headers`
              }
            },
            {
              resolve: `gatsby-remark-external-links`,
              options: {
                target: `_blank`,
                rel: `noopener`
              }
            },
            `gatsby-remark-relative-images`,
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 1400,
                quality: 90,
                linkImagesToOriginal: true
              }
            },
            `gatsby-remark-katex`,
            `gatsby-remark-code-titles`,
            {
              resolve: 'gatsby-remark-embed-youtube',
              options: {
                width: 800,
                height: 400
              }
            },
            {
              resolve: `gatsby-remark-emojis`,
              options: {
                active: true,
                size: 64,
                class: `emoji-icon`,
                styles: {
                  display: 'inline',
                  margin: '0',
                  'margin-top': '1px',
                  position: 'relative',
                  top: '5px',
                  width: '25px'
                }
              }
            },
            `gatsby-remark-graphviz`,
            {
              resolve: `gatsby-remark-prismjs`,
              options: {
                classPrefix: `language-`,
                inlineCodeMarker: null,
                aliases: {},
                showLineNumbers: true,
                noInlineHighlight: false
              }
            },
            ...gatsbyRemarkPlugins
          ]
        }
      },
      webpackBundleAnalyzer && {
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
          siteUrl
        }
      },
      `gatsby-plugin-advanced-sitemap`,
      {
        resolve: `gatsby-plugin-robots-txt`,
        options: {
          host: siteUrl,
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
                    url: path.join(siteUrl, blogPath, slug),
                    guid: path.join(siteUrl, blogPath, slug),
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
          trackingId: googleAnalyticsTrackingId
        }
      },
      // gatsby-plugin-manifest should be described before gatsby-plugin-offline
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: siteTitle,
          short_name: siteTitle,
          description: siteDescription,
          Scope: `/`,
          start_url: `/?utm_source=homescreen`,
          background_color: backgroundColor,
          theme_color: themeColor,
          display: `standalone`,
          icon: iconPath
        }
      },
      `gatsby-plugin-offline`
    ].filter(Boolean)
  };
};
