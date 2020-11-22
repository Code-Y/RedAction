# Working with Typescript

redux-fluent comes with first class typescript support,
here you can learn how to effectively leverage it!

```ts
import { createAction, createReducer, ofType } from 'redux-fluent';

interface Todo {
  id: string;
  title: string;
  status: 'completed' | 'progress' | 'pending';
}

const addTodo = createAction<'todos | add', Todo, void, Partial<Todo>>(
  'todos | add',
  (todo) => ({ ...todo, id: uuid() }),
);

const deleteTodo = createAction<'todos | add', Todo['id'], void, Todo>(
  'todos/:id | add',
  ({ id }) => id,
);

const editTodo = createAction<'todo/:id | edit', Partial<Todo>>(
  'todo/:id | edit',
);

// As you can see the state type is passed to the handlers from the reducer,
// while the action type comes from the action creator.
const todos = createReducer<'todos', Todo[]>('todos')
  .actions(
    ofType(addTodo).map((state, { payload }) => [...state, payload]),

    ofType(editTodo).map((state, { payload }) =>
      state.map((todo) =>
        todo.id === payload.id ? { ...todo, ...payload } : todo,
      ),
    ),

    ofType(deleteTodo).map((state, { payload }) =>
      state.filter((todo) => todo.id !== payload),
    ),
  )
  .default(() => []);
```

## Signature

```ts
function createAction<Type extends string, Payload, Meta, RawPayload, RawMeta>: ActionCreator<Type, Payload, Meta, RawPayload, RawMeta>

function createReducer<Type extends string, State>: Reducer<State, AnyAction>
```
