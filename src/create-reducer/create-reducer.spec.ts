import { createReducer } from './create-reducer';

describe('Reducer', () => {
  it('should export a function { createReducer }', () => {
    expect(createReducer).toBeInstanceOf(Function);
  });

  it('should have a name', () => {
    const name = 'foo';
    const reducer = createReducer(name).actions().default();

    expect(reducer).toHaveProperty('name', `reducer('${name}')`);
  });

  it('should have a type', () => {
    const name = 'bar';
    const reducer = createReducer(name).actions().default();

    expect(reducer).toHaveProperty('type', name);
  });

  describe('{ actions }', () => {
    it('should set $$context.handlers', () => {
      const fn1 = (arg: any) => arg;
      const fn2 = (arg: any) => arg;

      const reducer = createReducer('baz').actions(fn1, fn2).default();

      expect(reducer).toHaveProperty(['$$context', 'handlers'], [fn1, fn2]);
    });

    it('should return "hello world"', () => {
      const hello = jest.fn(() => 'hello');
      const world = jest.fn((state: string) => `${state} world`);

      const reducer = createReducer('baz').actions(hello, world).default();
      const state = reducer(null, { type: 'greetings' });

      expect(state).toStrictEqual('hello world');

      expect(hello).toHaveBeenCalledTimes(1);
      expect(world).toHaveBeenCalledTimes(1);
    });
  });

  describe('{ default }', () => {
    it('should set $$context.getDefaultState', () => {
      const getDefaultState = () => 'hello world';
      const reducer = createReducer('foo bar')
        .actions()
        .default(getDefaultState);

      expect(reducer).toHaveProperty(
        ['$$context', 'getDefaultState'],
        getDefaultState,
      );
    });

    it('should call getDefaultState when state is undefined', () => {
      const getDefaultState = jest.fn(() => 'default state');
      const reducer = createReducer('foo bar baz')
        .actions()
        .default(getDefaultState);

      const state2 = reducer(undefined, { type: '@@init' });
      expect(state2).toStrictEqual('default state');

      expect(getDefaultState).toHaveBeenCalledTimes(1);
    });

    it('should not call getDefaultState when state is not nil', () => {
      const getDefaultState = jest.fn(() => 'default state');
      const reducer = createReducer('bar baz foo')
        .actions()
        .default(getDefaultState);

      const state = reducer('not nil', { type: '@@init' });
      expect(state).toStrictEqual('not nil');

      expect(getDefaultState).toHaveBeenCalledTimes(0);
    });
  });
});
