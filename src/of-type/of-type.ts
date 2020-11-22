import { FSA } from 'flux-standard-action';
import { Action, AnyAction, Reducer } from 'redux';
import {
  ActionCreator,
  ActionCreatorWithPayloadAndMetaCreators,
  ActionCreatorWithPayloadCreator,
} from '../create-action/create-action';

export type RFR<S, A extends AnyAction = AnyAction> = (
  state: S,
  action: A,
) => S;

export function ofType<T extends string, P, M, RP, RM>(
  arg: ActionCreatorWithPayloadCreator<T, P, M, RP, RM>,
): {
  map: <S>(fn: RFR<S, FSA<T, P, M>>) => Reducer<S>;
};

export function ofType<T extends string, P, M, RP, RM>(
  arg: ActionCreatorWithPayloadAndMetaCreators<T, P, M, RP, RM>,
): {
  map: <S>(fn: RFR<S, FSA<T, P, M>>) => Reducer<S>;
};

export function ofType<T extends string, P, M, RP, RM>(
  arg: ActionCreator<T, P, M, RP, RM>,
): {
  map: <S>(fn: RFR<S, FSA<T, P, M>>) => Reducer<S>;
};

export function ofType<T extends string>(
  arg: T,
): {
  map: <S>(fn: RFR<S, Action<T>>) => Reducer<S>;
};

export function ofType<T extends string>(
  arg: Action<T>,
): {
  map: <S>(fn: RFR<S, Action<T>>) => Reducer<S>;
};

export function ofType(
  ...args: string[]
): {
  map: <S>(fn: RFR<S, Action<string>>) => Reducer<S>;
};

export function ofType<T extends string>(
  ...args: Action<T>[]
): {
  map: <S>(fn: RFR<S, Action<string>>) => Reducer<S>;
};

export function ofType(...args: unknown[]) {
  const types = args.map((a) => (a as AnyAction)?.type ?? a.toString());

  return {
    map: <S>(fn: RFR<S>): Reducer<S> => (state, action) =>
      types.includes(action.type) ? fn(state, action) : state,
  };
}
