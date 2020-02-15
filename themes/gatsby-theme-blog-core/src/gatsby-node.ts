import fs from 'fs';
import {
    CreatePagesArgs, GatsbyNode, Node, ParentSpanPluginArgs, PluginOptions, SourceNodesArgs
} from 'gatsby';
import { FluidObject } from 'gatsby-image';
// @ts-ignore
import { fmImagesToRelative } from 'gatsby-remark-relative-images';
import mkdirp from 'mkdirp';
import path from 'path';

import withDefault from './with-default';

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
    if (fs.existsSync(dir)) return;

    reporter.info(`Initializing "${dir}" directory`);
    mkdirp.sync(dir);
  });
};

export const sourceNodes: GatsbyNode['sourceNodes'] = (
  { actions, createNodeId, createContentDigest }: SourceNodesArgs,
  themeOptions: PluginOptions
): any => {
  const { createNode } = actions;
  const config = withDefault(themeOptions);

  createNode({
    ...config,
    id: createNodeId(`@hpprc/gatby-theme-blog-core-config`),
    parent: undefined,
    children: [],
    internal: {
      type: `BlogCoreConfig`,
      contentDigest: createContentDigest(config),
      content: JSON.stringify(config),
      description: `Options for @hpprc/gatsby-theme-blog-core`
    }
  });
};

export const createPages: GatsbyNode['createPages'] = async (
  { graphql, actions: { createPage }, reporter },
  themeOptions: PluginOptions
) => {
  const { blogPath, tagsPath, templatesPath, mdx } = withDefault(themeOptions);
  if (!mdx) return;

  const postTemplateJSX = path.resolve(path.join(templatesPath, 'post.jsx'));
  const postTemplateTSX = path.resolve(path.join(templatesPath, 'post.tsx'));
  const postByTagTemplateJSX = path.resolve(path.join(templatesPath, 'posts-by-tag.jsx'));
  const postByTagTemplateTSX = path.resolve(path.join(templatesPath, 'posts-by-tag.tsx'));

  const result = await graphql<Result>(query);
  if (!result?.data?.allMdx) return;

  const { edges } = result?.data?.allMdx;
  const postsByTag: PostByTag = {}; //Store posts for each tag

  if (fs.existsSync(postTemplateJSX) || fs.existsSync(postTemplateTSX)) {
    edges.forEach(({ previous, next, node }) => {
      const { slug, tags } = node.frontmatter;
      tags?.forEach(tag => {
        if (!postsByTag[tag]) postsByTag[tag] = [];
        postsByTag[tag].push(node);
      });

      createPage({
        path: path.join(blogPath, slug || ''),
        component: fs.existsSync(postTemplateJSX) ? postTemplateJSX : postTemplateTSX,
        context: {
          previous,
          next,
          slug
        }
      });
    });
  } else {
    reporter.warn(`there is no template compoent file, expected is ${path.join(templatesPath, 'post')}`);
  }

  // generate each tag's posts page if template exits
  if (fs.existsSync(postByTagTemplateJSX) || fs.existsSync(postByTagTemplateTSX)) {
    const tags = Object.keys(postsByTag);

    tags.forEach(tagName => {
      const posts = postsByTag[tagName];
      createPage({
        path: path.join(tagsPath, tagName),
        component: fs.existsSync(postByTagTemplateJSX) ? postByTagTemplateJSX : postByTagTemplateTSX,
        context: {
          posts,
          tagName
        }
      });
    });
  } else {
    reporter.warn(`there is no template compoent file, expected is ${path.join(templatesPath, 'post-by-tag')}`);
  }
};

export const onCreateNode: GatsbyNode['createPages'] = args => {
  const { node } = args as CreatePagesArgs & { node: Node };
  if (node.internal.type !== 'Mdx') return;

  fmImagesToRelative(node);
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

type Frontmatter = Partial<{
  slug: string;
  title: string;
  date: string;
  tags: string[];
  cover: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}>;

type PostByTag = {
  [key: string]: { frontmatter: Frontmatter; excerpt: string }[];
};
