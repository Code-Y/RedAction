<div align="center">

![redux-fluent](https://github.com/Code-Y/redux-fluent/blob/master/gitbook/redux-fluent-logo.jpg?raw=true)

[![Build Status](https://github.com/Code-Y/redux-fluent/workflows/Build/badge.svg)](https://github.com/Code-Y/redux-fluent/actions?query=workflow%3ABuild)
[![npm version](https://img.shields.io/npm/v/redux-fluent.svg)](https://www.npmjs.com/package/redux-fluent)
[![License](https://img.shields.io/npm/l/redux-fluent.svg)](https://github.com/Code-Y/redux-fluent/blob/master/LICENSE)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

[![npm downloads](https://img.shields.io/npm/dm/redux-fluent.svg)](https://www.npmjs.com/package/redux-fluent)
[![Maintainability](https://api.codeclimate.com/v1/badges/2e98502fb6072892995d/maintainability)](https://codeclimate.com/github/Code-Y/redux-fluent/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2e98502fb6072892995d/test_coverage)](https://codeclimate.com/github/Code-Y/redux-fluent/test_coverage)

#### ....................:::::::::::::::::::....................

#### [...::: TRY OUR COUNTER REDUCER EXAMPLE ON CODESANDBOX :::...](https://codesandbox.io/s/redux-fluent-the-counter-reducer-enoc2?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fstore%2Fcounter%2Fcounter.reducers.ts&theme=dark)

#### ....................:::::::::::::::::::....................

<hr />
</div>

### Installation

```
yarn add redux-fluent redux flux-standard-action
```

### Documentation

- https://code-y.github.io/redux-fluent

### Getting Started

```typescript
import { createStore } from 'redux';
import { createAction, createReducer, ofType } from 'redux-fluent';

const increment = createAction('increment');
const decrement = createAction('decrement');

const counter = createReducer('counter')
  .actions(
    ofType(increment).map((state) => state + 1),
    ofType(decrement).map((state) => state - 1),
  )
  .default(() => 0);

const store = createStore(counter);

store.dispatch(increment());
```

### Distribution

- https://www.npmjs.com/package/redux-fluent

### Stats

- `3.2 kB` - https://bundlephobia.com/result?p=redux-fluent

### Discussion

- [![Gitter](https://badges.gitter.im/redux-fluent/community.svg)](https://gitter.im/redux-fluent/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
- [StackOverflow](https://stackoverflow.com/questions/tagged/redux-fluent)
- [Github Issues](https://github.com/Code-Y/redux-fluent/issues)
- [Submit a Pull Request](https://github.com/Code-Y/redux-fluent/pulls)

### License

[MIT](https://github.com/Code-Y/redux-fluent/blob/master/LICENSE)
