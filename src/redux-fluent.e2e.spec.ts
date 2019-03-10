import { createStore } from 'redux';
import {
  createAction,
  combineReducers,
  createReducer, ofType,
} from './redux-fluent';


describe('redux-fluent E2E', () => {
  interface Todo {
    id: string;
    completed: boolean;
  }

  const actions = {
    addTodo: createAction<'todos | add', Todo>('todos | add'),
  };

  const todos = createReducer<'todos', Todo[]>('todos')
    .actions(
      ofType(actions.addTodo)
        .map(((state, action) => state.concat(action.payload))),
    )
    .default(() => []);

  const rootReducer = combineReducers(todos);

  it('should add a todo', () => {
    const store = createStore(rootReducer);
    const todo = {
      id: 'first-todo-id',
      status: 'pending',
    };

    store.dispatch(actions.addTodo(todo));
    expect(
      store.getState(),
    ).toMatchSnapshot();
  });
});
