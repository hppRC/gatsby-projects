const withDefault = require('./with-default');

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }, themeOptions) => {
  const { createNode } = actions;
  const config = withDefault(themeOptions);

  createNode({
    ...config,
    id: createNodeId(`@hpprc/gatby-theme-core-config`),
    parent: undefined,
    children: [],
    internal: {
      type: `hpprcBlogThemeConfig`,
      contentDigest: createContentDigest(config),
      content: JSON.stringify(config),
      description: `Options for @hpprc/gatsby-theme-core (with default option)`
    }
  });
};
