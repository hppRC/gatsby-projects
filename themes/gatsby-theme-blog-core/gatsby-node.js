// you should write require('ts-node').register once in projects's gatsby-*.js

const { sourceNodes, onPreBootstrap, createPages, onCreateNode } = require('./gatsby-node.ts');

exports.sourceNodes = sourceNodes;
exports.onPreBootstrap = onPreBootstrap;
exports.createPages = createPages;
exports.onCreateNode = onCreateNode;
