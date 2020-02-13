import fs from 'fs';
import {
    CreatePagesArgs, CreateSchemaCustomizationArgs, GatsbyNode, Node, ParentSpanPluginArgs,
    PluginOptions, SourceNodesArgs
} from 'gatsby';
import { FluidObject } from 'gatsby-image';
// @ts-ignore
import { fmImagesToRelative } from 'gatsby-remark-relative-images';
import { createFilePath } from 'gatsby-source-filesystem';
import mkdirp from 'mkdirp';
import path from 'path';

import { withDefault } from './src';

export const onPreBootstrap: GatsbyNode['onPreBootstrap'] = (
  { reporter, store }: ParentSpanPluginArgs,
  themeOptions: PluginOptions
) => {
  const { program } = store.getState();
  const { assetsPath, postsPath, templatesPath } = withDefault(themeOptions);

  const dirs = [
    path.join(program.directory, postsPath), // default: /contents/posts
    path.join(program.directory, assetsPath), // default: /contents/assets
    path.join(program.directory, templatesPath) // default: /src/templates
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      reporter.info(`Initializing "${dir}" directory`);
      mkdirp.sync(dir);
    }
  });
};

export const sourceNodes: GatsbyNode['sourceNodes'] = async (
  { actions, createNodeId, createContentDigest }: SourceNodesArgs,
  themeOptions: PluginOptions
) => {
  const { createNode } = actions;
  const config = withDefault(themeOptions);

  createNode({
    ...config,
    id: createNodeId(`@hpprc/gatby-theme-blog-core-config`),
    parent: undefined,
    children: [],
    internal: {
      type: `BlogConfig`,
      contentDigest: createContentDigest(config),
      content: JSON.stringify(config),
      description: `Options for @hpprc/gatsby-theme-blog-core`
    }
  });
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async ({}: //actions
CreateSchemaCustomizationArgs) => {
  //console.log(actions);
};

export const createPages: GatsbyNode['createPages'] = async (
  { graphql, actions: { createPage } },
  themeOptions: PluginOptions
) => {
  const { blogPath, tagsPath, templatesPath } = withDefault(themeOptions);
  const postTemplate = path.resolve(`${templatesPath}/post`);
  const postByTagTemplate = path.resolve(`${templatesPath}/posts-by-tag`);

  const result = await graphql<Result>(query);

  const edges = result?.data?.allMdx.edges;
  const postsByTag: {
    [key: string]: { frontmatter: Frontmatter; excerpt: string }[];
  } = {}; //Store posts for each tag

  edges?.forEach(({ previous, next, node }) => {
    node.frontmatter.tags?.forEach(tag => {
      if (!postsByTag[tag]) postsByTag[tag] = [];

      postsByTag[tag].push(node);
    });

    createPage({
      path: `${blogPath}/${node.frontmatter.slug}`,
      component: postTemplate,
      context: {
        previous,
        next,
        slug: node.frontmatter.slug
      }
    });
  });

  const tags = Object.keys(postsByTag);

  tags.forEach(tagName => {
    const posts = postsByTag[tagName];
    createPage({
      path: `${tagsPath}/${tagName}`,
      component: postByTagTemplate,
      context: {
        posts,
        tagName
      }
    });
  });
};

export const onCreateNode: GatsbyNode['createPages'] = args => {
  const {
    node,
    actions: { createNodeField },
    getNode
  } = args as CreatePagesArgs & { node: Node };
  fmImagesToRelative(node);
  console.log(node.internal);
  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};

//you can't use QraphQL query fragments to get fluid object in gatsby-node.
const query = `
query {
  allMdx(sort: { order: ASC, fields: [frontmatter___date] }) {
    edges {
      previous {
        excerpt
        frontmatter {
          slug
          title
          date(formatString: "YYYY-MM-DD")
          tags
          cover {
            childImageSharp {
              fluid(maxWidth: 1400, quality: 90) {
                tracedSVG
                base64
                sizes
                srcSet
                src
                srcSetWebp
                srcWebp
                aspectRatio
              }
            }
          }
        }
      }
      next {
        excerpt
        frontmatter {
          slug
          title
          date(formatString: "YYYY-MM-DD")
          tags
          cover {
            childImageSharp {
              fluid(maxWidth: 1400, quality: 90) {
                tracedSVG
                base64
                sizes
                srcSet
                src
                srcSetWebp
                srcWebp
                aspectRatio
              }
            }
          }
        }
      }
      node {
        excerpt
        frontmatter {
          slug
          title
          date(formatString: "YYYY-MM-DD")
          tags
          cover {
            childImageSharp {
              fluid(maxWidth: 1400, quality: 90) {
                tracedSVG
                base64
                sizes
                srcSet
                src
                srcSetWebp
                srcWebp
                aspectRatio
              }
            }
          }
        }
      }
    }
  }
}
`;

type Result = {
  allMdx: {
    edges: {
      previous: {
        frontmatter: Frontmatter;
        excerpt: string;
      } | null;
      next: {
        frontmatter: Frontmatter;
        excerpt: string;
      } | null;
      node: {
        frontmatter: Frontmatter;
        excerpt: string;
      };
    }[];
  };
};

type Frontmatter = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  cover: {
    childImageSharp: {
      fluid: FluidObject;
    };
  } | null;
};
