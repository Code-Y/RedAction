const filenames = {
  files: ['*.*'],
  plugins: ['unicorn'],
  rules: {
    'unicorn/filename-case': [
      2,
      {
        case: 'kebabCase',
      },
    ],
  },
};

const javascript = {
  files: ['*.js'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
};

const typescript = {
  files: ['*.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['eslint-plugin-tsdoc'],
  extends: [
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'no-use-before-define': 0,
    'implicit-arrow-linebreak': 0,
    'operator-linebreak': 0,
    '@typescript-eslint/no-use-before-define': 2,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'tsdoc/syntax': 1,
  },
};

const imports = {
  files: ['*.js', '*.ts'],
  rules: {
    'import/no-extraneous-dependencies': [2, {}],
    'import/no-default-export': 2,
    'import/prefer-default-export': 0,
    'no-restricted-imports': [
      2,
      {
        name: 'uuid',
        message:
          'Importing directly from `uuid` is now deprecated. Please import from `uuid/[version]` instead.',
      },
      {
        name: 'react-router',
        message:
          'Please import from `react-router-dom` which provides DOM aware components.',
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        mjs: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};

const jest = {
  files: ['*.test.ts', '*.test.js'],
  extends: [
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest-dom/recommended',
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 0,
    'jest/lowercase-name': [1, { ignore: ['describe'] }],
    'jest/expect-expect': [
      1,
      {
        assertFunctionNames: ['expect'],
      },
    ],
  },
};

module.exports = [filenames, javascript, imports, jest, typescript];
