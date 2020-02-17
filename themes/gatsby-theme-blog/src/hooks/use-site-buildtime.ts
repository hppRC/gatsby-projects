import { graphql, useStaticQuery } from 'gatsby';

import { UseSiteBuildtime } from '../../types';

export default () => {
  const { site } = useStaticQuery<UseSiteBuildtime>(graphql`
    query {
      site {
        buildTime(formatString: "YYYY-MM-DD")
      }
    }
  `);

  return site.buildTime;
};
