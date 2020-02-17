import { graphql, useStaticQuery } from 'gatsby';

import { UseAnyImage } from '../../types';

export default (filename: string) => {
  //relativePath: path from `image`
  //it is configured in gatsby-config.js of `gatsby-source-filesystem`
  const { allFile } = useStaticQuery<UseAnyImage>(graphql`
    query {
      allFile {
        nodes {
          relativePath
          childImageSharp {
            fluid(maxWidth: 1400, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  `);

  const targetImage = allFile.nodes?.find(({ relativePath }) => {
    return relativePath.includes(filename);
  });

  return targetImage?.childImageSharp.fluid;
};
