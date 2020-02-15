import { graphql, useStaticQuery } from 'gatsby';

import { SiteMetadata } from '@hpprc/gatsby-theme-blog-core';

/**
 * ex. const {siteTitle, siteUrl} = useSiteMetadata();
 */
export default () => {
  const data = useStaticQuery<SiteMetadata>(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          siteTitleAlt
          siteHeadline
          siteUrl
          siteDescription
          siteLanguage
          author
          social {
            twitter
            github
            qiita
          }
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
