# createReducer

Factory for redux-fluent reducers.

```typescript
import { createReducer } from 'redux-fluent';

createReducer(name)
  .actions(...handlers)
  .default(getDefaultState);
```

## Arguments

- `string` - the name of the reducer

## Returns

```typescript
({
  actions: (...handlers) => ({
    default: (getDefaultState) => ReduxFluentReducer,
  }),
});
```

## Usage

Combine `handlers` together with a `getDefaultState` function to output a redux reducer.

```typescript
createReducer('reducer-name')
  .actions(...handlers)
  .default(getDefaultState);
```

### Handlers

- any function implementing the reducer interface `(state, action) => state`.
