import { AnyAction, Reducer } from 'redux';

type GetDefaultState<S> = (state: undefined, action: AnyAction) => S;

const createContext = <S>() => ({
  getDefaultState: undefined as GetDefaultState<S>,
  handlers: [] as Reducer<S>[],
});

export function createReducer<N extends string, S = unknown>(name: N) {
  const context = createContext<S>();

  const orDefault: Reducer<S> = (state, action) =>
    state === undefined
      ? context.getDefaultState(state as undefined, action)
      : state;

  const $reducer: Reducer<S> & { type: string } = (state, action) =>
    context.handlers.reduce(
      ($state, handler) => handler($state, action),
      orDefault(state, action),
    );

  Object.defineProperty($reducer, '$$context', {
    value: context,
  });

  if (process.env.NODE_ENV !== 'production') {
    Object.defineProperty($reducer, 'name', {
      configurable: true,
      value: `reducer('${name}')`,
    });
  }

  $reducer.type = name;

  return {
    actions(...handlers: Reducer<S>[]) {
      context.handlers = handlers;

      return {
        default(getDefaultState: GetDefaultState<S> = () => null) {
          context.getDefaultState = getDefaultState;

          return $reducer;
        },
      };
    },
  };
}
