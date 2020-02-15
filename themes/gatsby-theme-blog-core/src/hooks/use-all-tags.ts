import { graphql, useStaticQuery } from 'gatsby';

import { AllPosts } from '@hpprc/gatsby-theme-blog-core';

export default () => {
  const data = useStaticQuery<AllPosts>(graphql`
    query {
      allMdx {
        nodes {
          frontmatter {
            tags
          }
        }
      }
    }
  `);

  const posts = data.allMdx.nodes;
  const tags = new Set<string>();

  posts.forEach(({ frontmatter }) => {
    frontmatter.tags?.forEach((tag: string) => tags.add(tag));
  });

  return Array.from(tags.values());
};
