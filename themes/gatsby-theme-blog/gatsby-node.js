const fs = require('fs');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const mkdirp = require('mkdirp');
const path = require('path');

const withDefault = require('./with-default');

exports.onPreBootstrap = ({ reporter, store }, themeOptions) => {
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

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }, themeOptions) => {
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

exports.createPages = async ({ graphql, actions: { createPage }, reporter }, themeOptions) => {
  const { blogPath, tagsPath, templatesPath, mdx } = withDefault(themeOptions);
  if (!mdx) return;

  const postTemplateJSX = path.resolve(path.join(templatesPath, 'post.jsx'));
  const postTemplateTSX = path.resolve(path.join(templatesPath, 'post.tsx'));
  const postByTagTemplateJSX = path.resolve(path.join(templatesPath, 'posts-by-tag.jsx'));
  const postByTagTemplateTSX = path.resolve(path.join(templatesPath, 'posts-by-tag.tsx'));

  const result = await graphql(query);
  if (!result || !result.data || !result.data.allMdx || !result.data.allMdx.edges) return;

  const { edges } = result.data.allMdx;
  const postsByTag = {}; //Store posts for each tag

  if (fs.existsSync(postTemplateJSX) || fs.existsSync(postTemplateTSX)) {
    edges.forEach(({ previous, next, node }) => {
      const { slug, tags } = node.frontmatter;
      if (!tags) return;
      tags.forEach(tag => {
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

exports.onCreateNode = args => {
  const { node } = args;
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
