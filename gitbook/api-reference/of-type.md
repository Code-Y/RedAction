# ofType

Helps you narrow down the set of actions
to which your `handler` should respond to.

```typescript
import { ofType } from 'redux-fluent';

ofType(...types);
```

## Arguments

- variadic
- `string | { type: string } | { toString(): string }` - the action types

## Returns

```typescript
({
  map: (handler) => Reducer,
});
```

## Usage

Applies the `mapFn` if the given action matches with the expected types.

```typescript
ofType('foo', 'bar', baz).map(mapFn);
```

- applies `mapFn` if `action.type` is either `foo`, `bar` or `baz.type | baz.toString()`
