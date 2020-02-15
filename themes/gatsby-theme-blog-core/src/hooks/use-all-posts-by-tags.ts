import { graphql, useStaticQuery } from 'gatsby';

import { AllPosts, PostByTag } from '@hpprc/gatsby-theme-blog-core';

export default () => {
  const data = useStaticQuery<AllPosts>(graphql`
    query {
      allMdx(sort: { order: ASC, fields: [frontmatter___date] }) {
        nodes {
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
  const { nodes } = data.allMdx;
  const postsByTag: PostByTag = {};

  nodes.forEach(node => {
    const { frontmatter } = node;
    frontmatter.tags?.forEach(tag => {
      if (!postsByTag[tag]) {
        postsByTag[tag] = [];
      }
      postsByTag[tag].push(node);
    });
  });

  return postsByTag;
};
