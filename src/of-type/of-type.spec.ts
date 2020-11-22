import { ofType } from './of-type';
import { createAction } from '../create-action/create-action';
import { createReducer } from '../create-reducer/create-reducer';

describe('ofType', () => {
  it('should export a function { ofType }', () => {
    expect(ofType).toBeInstanceOf(Function);
  });

  it('should return a function { map }', () => {
    expect(ofType('foo').map).toBeInstanceOf(Function);
  });

  it('should match', () => {
    const spy = jest.fn();

    const state = 'hello';
    const action = createAction('match');
    const reducer = createReducer('should match')
      .actions(ofType('match').map(spy))
      .default();

    reducer(state, action);

    expect(spy).toHaveBeenCalledWith(state, action);
  });

  it('should not match', () => {
    const spy = jest.fn();

    const state = 'hello';
    const action = createAction('match');
    const reducer = createReducer('should match')
      .actions(ofType('not match').map(spy))
      .default();

    reducer(state, action);

    expect(spy).not.toHaveBeenCalledWith(state, action);
  });
});
