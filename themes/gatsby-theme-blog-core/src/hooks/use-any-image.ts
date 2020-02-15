import { graphql, useStaticQuery } from 'gatsby';

import { AllFile } from '@hpprc/gatsby-theme-blog-core';

/**
 * use any image in /assets
 */
export default (filename: string) => {
  const data = useStaticQuery<AllFile>(graphql`
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

  const node = data.allFile.nodes.find(node => {
    return node.relativePath.includes(filename);
  });

  return node?.childImageSharp.fluid;
};
