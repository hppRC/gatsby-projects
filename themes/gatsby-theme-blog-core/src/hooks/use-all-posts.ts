import { graphql, useStaticQuery } from 'gatsby';

import { AllPosts } from '@hpprc/gatsby-theme-blog-core';

export default () => {
  const data = useStaticQuery<AllPosts>(graphql`
    query {
      allMdx(sort: { order: ASC, fields: [frontmatter___date] }) {
        nodes {
          id
          excerpt(pruneLength: 100)
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            slug
            tags
            cover {
              childImageSharp {
                fluid(maxWidth: 1400, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  `);

  return data.allMdx.nodes;
};
