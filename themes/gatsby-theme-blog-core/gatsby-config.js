// you should write require('ts-node').register once in projects's gatsby-*.js
'use strict';
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2019'
  }
});

module.exports = require('./gatsby-config/index');
