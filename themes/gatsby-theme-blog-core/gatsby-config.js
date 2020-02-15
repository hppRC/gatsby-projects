'use strict';

// `register` is necessary (if you remove this code, this plugin will not work), but I don't know why.
// please somebody help me
require('ts-node').register({
  compilerOptions: {
    target: 'es5',
    module: 'commonjs'
  }
});

module.exports = require('./src/gatsby-config').default;
