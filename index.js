// eslint-disable-next-line spaced-comment
/// <reference path="./index.d.ts" />

// eslint-disable-next-line import/no-dynamic-require
module.exports = require(`./dist/redux-fluent.${
  process.env.NODE_ENV === 'production' ? 'production' : 'development'
}.js`);
