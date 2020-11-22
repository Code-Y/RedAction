const overrides = require('./.eslintrc.overrides.js');

const root = true;

module.exports = {
  extends: ['airbnb-base', 'prettier'],
  overrides,
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  root,
};
