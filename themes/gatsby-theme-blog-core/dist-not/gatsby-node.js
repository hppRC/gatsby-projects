"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
// @ts-ignore
const gatsby_remark_relative_images_1 = require("gatsby-remark-relative-images");
const mkdirp_1 = __importDefault(require("mkdirp"));
const path_1 = __importDefault(require("path"));
const src_1 = require("./src");
exports.onPreBootstrap = ({ reporter, store }, themeOptions) => {
    const { program } = store.getState();
    const { assetsPath, postsPath, templatesPath } = src_1.withDefault(themeOptions);
    const dirs = [
        path_1.default.join(program.directory, postsPath),
        path_1.default.join(program.directory, assetsPath),
        path_1.default.join(program.directory, templatesPath) // default: /src/templates
    ];
    dirs.forEach(dir => {
        if (fs_1.default.existsSync(dir))
            return;
        reporter.info(`Initializing "${dir}" directory`);
        mkdirp_1.default.sync(dir);
    });
};
exports.sourceNodes = ({ actions, createNodeId, createContentDigest }, themeOptions) => {
    const { createNode } = actions;
    const config = src_1.withDefault(themeOptions);
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
    const { blogPath, tagsPath, templatesPath, mdx } = src_1.withDefault(themeOptions);
    if (!mdx)
        return;
    const postTemplateJSX = path_1.default.resolve(path_1.default.join(templatesPath, 'post.jsx'));
    const postTemplateTSX = path_1.default.resolve(path_1.default.join(templatesPath, 'post.tsx'));
    const postByTagTemplateJSX = path_1.default.resolve(path_1.default.join(templatesPath, 'posts-by-tag.jsx'));
    const postByTagTemplateTSX = path_1.default.resolve(path_1.default.join(templatesPath, 'posts-by-tag.tsx'));
    const result = await graphql(query);
    if (!result?.data?.allMdx)
        return;
    const { edges } = result?.data?.allMdx;
    const postsByTag = {}; //Store posts for each tag
    if (fs_1.default.existsSync(postTemplateJSX) || fs_1.default.existsSync(postTemplateTSX)) {
        edges.forEach(({ previous, next, node }) => {
            const { slug, tags } = node.frontmatter;
            tags?.forEach(tag => {
                if (!postsByTag[tag])
                    postsByTag[tag] = [];
                postsByTag[tag].push(node);
            });
            createPage({
                path: path_1.default.join(blogPath, slug || ''),
                component: fs_1.default.existsSync(postTemplateJSX) ? postTemplateJSX : postTemplateTSX,
                context: {
                    previous,
                    next,
                    slug
                }
            });
        });
    }
    else {
        reporter.warn(`there is no template compoent file, expected is ${path_1.default.join(templatesPath, 'post')}`);
    }
    // generate each tag's posts page if template exits
    if (fs_1.default.existsSync(postByTagTemplateJSX) || fs_1.default.existsSync(postByTagTemplateTSX)) {
        const tags = Object.keys(postsByTag);
        tags.forEach(tagName => {
            const posts = postsByTag[tagName];
            createPage({
                path: path_1.default.join(tagsPath, tagName),
                component: fs_1.default.existsSync(postByTagTemplateJSX) ? postByTagTemplateJSX : postByTagTemplateTSX,
                context: {
                    posts,
                    tagName
                }
            });
        });
    }
    else {
        reporter.warn(`there is no template compoent file, expected is ${path_1.default.join(templatesPath, 'post-by-tag')}`);
    }
};
exports.onCreateNode = args => {
    const { node } = args;
    if (node.internal.type !== 'Mdx')
        return;
    gatsby_remark_relative_images_1.fmImagesToRelative(node);
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
//# sourceMappingURL=gatsby-node.js.map