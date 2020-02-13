// you should write require('ts-node').register once in projects's gatsby-*.js

exports.sourceNodes = require('./gatsby-node.ts').sourceNodes;
exports.onPreBootstrap = require('./gatsby-node.ts').onPreBootstrap;
