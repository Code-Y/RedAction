import { combineReducers, createStore } from 'redux';
import { isError } from 'flux-standard-action';
import { createAction, createReducer, ofType } from './redux-fluent';

interface Todo {
  id: string;
  completed: boolean;
}

const actions = {
  greet: createAction<'messages | greet'>('messages | greet'),
  addTodo: createAction<'todos | add', Todo>('todos | add'),
  deleteTodo: createAction<'todos/:id | delete', Todo['id'], void, Todo>(
    'todos/:id | delete',
    (todo) => todo.id,
  ),
};

const todos = createReducer<'todos', Todo[]>('todos')
  .actions(
    ofType(actions.addTodo).map((state, action) =>
      state.concat(action.payload),
    ),
    ofType(actions.deleteTodo).map((state, action) =>
      isError(action) ? state : state.filter(({ id }) => id !== action.payload),
    ),
  )
  .default(() => []);

const errors = createReducer<'errors', string[]>('errors')
  .actions(
    ofType(actions.addTodo).map((state, action) =>
      isError(action) ? [...state, action.payload.message] : state,
    ),
  )
  .default(() => []);

describe('redux-fluent E2E', () => {
  it('should add a todo', () => {
    const reducer = combineReducers({ todos, errors });
    const store = createStore(reducer);

    const todo = {
      id: 'first-todo-id',
      completed: false,
    };

    store.dispatch(actions.addTodo(todo));
    expect(store.getState()).toMatchSnapshot();
  });

  it('should delete a todo', () => {
    const reducer = combineReducers({ todos, errors });
    const store = createStore(reducer);

    const todo = {
      id: 'first-todo-id',
      completed: true,
    };

    store.dispatch(actions.addTodo(todo));
    expect(store.getState()).toMatchSnapshot();

    store.dispatch(actions.deleteTodo(new Error('something went wrong')));
    expect(store.getState()).toMatchSnapshot();

    store.dispatch(actions.deleteTodo(todo));
    expect(store.getState()).toMatchSnapshot();
  });
});
