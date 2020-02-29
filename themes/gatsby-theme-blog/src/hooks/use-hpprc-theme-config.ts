import { graphql, useStaticQuery } from 'gatsby';

import { UseHpprcThemeConfig } from '../../types';

/**
 * ex. const {siteTitle, siteUrl} = useSiteMetadata();
 */
export default () => {
  const { hpprcBlogThemeConfig } = useStaticQuery<UseHpprcThemeConfig>(graphql`
    query {
      hpprcBlogThemeConfig {
        assetsPath
        backgroundColor
        basePath
        blogPath
        googleAnalyticsTrackingId
        iconPath
        id
        mdx
        postsPath
        siteDescription
        siteTitle
        siteUrl
        tagsPath
        themeColor
        webpackBundleAnalyzer
        lightTheme {
          color
          backgroundColor
          cardBackground
          cardBoxShadow
          codeBackground
          headingBorder
          tocBackground
        }
        darkTheme {
          color
          backgroundColor
          cardBackground
          cardBoxShadow
          codeBackground
          headingBorder
          tocBackground
        }
      }
    }
  `);

  return hpprcBlogThemeConfig;
};
