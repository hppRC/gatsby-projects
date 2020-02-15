import { graphql, useStaticQuery } from 'gatsby';

import { Site } from '@hpprc/gatsby-theme-blog-core';

export default () => {
  const data = useStaticQuery<Site>(graphql`
    query {
      site {
        buildTime(formatString: "YYYY-MM-DD")
      }
    }
  `);

  return data.site.buildTime;
};
