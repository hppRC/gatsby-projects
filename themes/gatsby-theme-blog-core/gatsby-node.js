// you should write require('ts-node').register once in projects's gatsby-*.js

exports.sourceNodes = require('./gatsby-node/index').sourceNodes;
exports.onPreBootstrap = require('./gatsby-node/index').onPreBootstrap;
