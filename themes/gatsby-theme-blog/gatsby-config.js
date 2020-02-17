const withDefault = require('./with-default');

module.exports = themeOptions => {
  const {
    siteTitle,
    siteUrl,
    siteDescription,
    postsPath,
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
              resolve: `gatsby-remark-autolink-headers`,
              options: {
                offsetY: `100`,
                icon: `
                <svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20">
                  <path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z">
                  </path>
                </svg>
                `,
                className: `autolink-headers`
              }
            },
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
