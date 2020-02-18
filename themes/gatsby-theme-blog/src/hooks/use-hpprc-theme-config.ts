import { graphql, useStaticQuery } from 'gatsby';

import { UseHpprcThemeConfig } from '../../types';

/**
 * ex. const {siteTitle, siteUrl} = useSiteMetadata();
 */
export default () => {
  const {} = useStaticQuery<UseHpprcThemeConfig>(graphql`
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
      }
    }
  `);
};
