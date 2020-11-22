# Action

A redux-fluent action creator outputs FSA actions to
help facilitate interoperability with other systems:
Please, refer to the [FSA documentation](https://github.com/redux-utilities/flux-standard-action) to understand why a Flux Standard Action _"is Useful, Simple and Human Friendly!"_

```typescript
// todos.actions.js
import { createAction } from 'redux-fluent';

export const addTodo = createAction('ADD_TODO');
export const editTodo = createAction('EDIT_TODO');
export const deleteTodo = createAction('DELETE_TODO');
```

<br />

> Actions are payloads of information that send data from your application to your store.
> They are the only source of information for the store. You send them to the store using [`store.dispatch()`](https://redux.js.org/api/store#dispatchaction).

<br />

```typescript
import { addTodo } from './todos.actions.js';

store.dispatch(addTodo({ title: 'Have some fun' }));
```

<br />
___

## Action Types

We wanted to remove all the boilerplate that is normally involved in standard redux projects.
You no longer need to either declare or export constants.

```typescript
import { addTodo } from './todos.actions.js';

console.log(addTodo.type);
// 'ADD_TODO'
```

<br />
___

## All-In-One

A redux-fluent action squeezes all the concepts of [action](https://redux.js.org/basics/actions#actions), [action type](https://redux.js.org/basics/actions#actions) and [action creator](https://redux.js.org/basics/actions#action-creators) together.
All you need is a one-line declaration. That's it!
