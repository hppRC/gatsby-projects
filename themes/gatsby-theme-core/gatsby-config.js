const withDefault = require('./with-default');
const path = require('path');

module.exports = themeOptions => {
  const {
    siteTitle,
    siteUrl,
    siteDescription,
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
