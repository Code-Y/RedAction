# Reducer

A redux-fluent reducer is a simple function combinator, you can use it to build
up composite business logic by gluing small and dedicated functions together.

```typescript
import { createReducer, ofType } from 'redux-fluent';

export const greetingsReducer = createReducer('greetings')
  .actions(
    ofType('Roger Waters', 'David Gilmour', 'Nick Mason' /* ... */).map(
      greetThePinkFloyd,
    ),
    ofType('B.B. King').map(greetTheBluesBoy),
    greetEveryoneElse,
  )
  .default(() => 'Hello World');
```

<br />
___

## Matching Actions

Manually orchestrating the _"which action to respond to"_ can negatively impact the readability and expressiveness of your program.
redux-fluent abstracts orchestration into a clean and functional API that lets you focus on your business logic.
No more switch-cases!

```typescript
import { ofType } from 'redux-fluent';
```

- Yup! It really works pretty much like [redux-observable#ofType](https://redux-observable.js.org/docs/basics/Epics.html)

---

## Handling Actions

The [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle) says that _"a thing should only have one responsibility"_.
This is the area where a standard redux reducer fails. It is really impossible for a reducer to do only one thing.
We decided to leave to the reducer the only job of composing behaviour and use simple functions (action handlers) to define the transition logic (how to bring the state from `A` to `B`).

```typescript
export const increment = (state) => state + 1;
```

<br />
___

## The Counter Example

If from one side _actions_ are meant to describe _"what happened"_,
on the other side reducers are responsible for defining the state shape and its transition logic.

{% codesandbox %}
https://codesandbox.io/s/redux-fluent-the-counter-reducer-enoc2?fontsize=10&hidenavigation=1&theme=dark&module=%2Fsrc%2Fstore%2Fcounter%2Fcounter.reducers.ts&view=preview
{% endcodesandbox %}

```typescript
// counter.actions.js
import { createAction } from 'redux-fluent';

export const increment = createAction('INCREMENT_COUNTER');
export const decrement = createAction('DECREMENT_COUNTER');
export const reset = createAction('RESET_COUNTER');
```

```typescript
// counter.handlers.js

export const increment = (state) => state + 1;
export const decrement = (state) => state - 1;
export const reset = () => 0;
```

```typescript
// counter.reducers.js
import { ofType, createReducer } from 'redux-fluent';
import * as actions from './counter.actions';
import * as handlers from './counter.handlers';

export const counterReducer = createReducer('todos')
  .actions(
    ofType(actions.increment).map(handlers.increment),
    ofType(actions.decrement).map(handlers.decrement),
    ofType(actions.reset).map(handlers.reset),
  )
  .default(() => 0);
```

```typescript
import { createStore, combineReducers } from 'redux';
import { counterReducer } from './counter.reducers';

export const store = createStore(combineReducers({ counter: counterReducer }));
```
