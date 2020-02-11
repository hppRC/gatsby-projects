import fs from 'fs';
import { GatsbyNode, ParentSpanPluginArgs, PluginOptions, SourceNodesArgs } from 'gatsby';
import mkdirp from 'mkdirp';
import path from 'path';

import { withDefault } from '@hpprc/gatsby-theme-blog-core';

export const onPreBootstrap: GatsbyNode['onPreBootstrap'] = (
  { reporter, store }: ParentSpanPluginArgs,
  themeOptions: PluginOptions
) => {
  const { program } = store.getState();

  const { contentsPath } = withDefault(themeOptions);

  console.log('program directory', program.directory);
  const dirs = [
    path.join(program.directory, contentsPath as string, 'posts'),
    path.join(program.directory, contentsPath as string, 'assets')
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
