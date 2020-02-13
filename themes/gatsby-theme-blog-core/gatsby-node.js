// you should write require('ts-node').register once in projects's gatsby-*.js

exports.sourceNodes = require('./gatsby-node.ts').sourceNodes;
exports.onPreBootstrap = require('./gatsby-node.ts').onPreBootstrap;
exports.createPages = require('./gatsby-node.ts').createPages;
exports.onCreateNode = require('./gatsby-node.ts').onCreateNode;
exports.createSchemaCustomization = require('./gatsby-node.ts').createSchemaCustomization;
