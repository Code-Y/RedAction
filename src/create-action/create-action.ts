import { ErrorFSA, FSA } from 'flux-standard-action';

type Formatter<T, R> = (rawPayload: unknown, rawMeta: unknown, type: T) => R;

export interface ActionCreatorWithPayloadCreator<
  T extends string,
  P,
  M,
  RP,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  RM
> {
  type: T;
  toString(): T;

  <Payload extends Error | RP>(payload?: Payload): Payload extends Error
    ? ErrorFSA<Payload, M, T>
    : FSA<T, P, M>;
}

export interface ActionCreator<T extends string, P, M, RP, RM>
  extends ActionCreatorWithPayloadCreator<T, P, M, RP, RM> {
  (): FSA<T, P, M>;
}

export interface ActionCreatorWithPayloadAndMetaCreators<
  T extends string,
  P,
  M,
  RP,
  RM
> extends ActionCreatorWithPayloadCreator<T, P, M, RP, RM> {
  <Payload extends Error | RP>(
    payload: Payload,
    meta: RM,
  ): Payload extends Error ? ErrorFSA<Payload, M, T> : FSA<T, P, M>;
}

export function createAction<T extends string, P = void, M = void>(
  type: T,
): ActionCreator<T, P, M, P, M>;

export function createAction<
  T extends string,
  P = void,
  M = void,
  RP = void,
  RM = void
>(
  type: T,
  payloadCreator: (rawPayload: RP, rawMeta: RM, $type: T) => P,
): ActionCreatorWithPayloadCreator<T, P, M, RP, RM>;

export function createAction<
  T extends string,
  P = void,
  M = void,
  RP = void,
  RM = void
>(
  type: T,
  payloadCreator: (rawPayload: RP, rawMeta: RM, $type: T) => P,
  metaCreator: (rawPayload: RP, rawMeta: RM, $type: T) => P,
): ActionCreatorWithPayloadAndMetaCreators<T, P, M, RP, RM>;

export function createAction<T extends string, P, M>(
  type: T,
  payloadCreator?: Formatter<T, P>,
  metaCreator?: Formatter<T, M>,
) {
  const $creator = (rawPayload?: unknown, rawMeta?: unknown): FSA<T, P, M> => {
    const action: FSA<T, P, M> = { type };

    const payload =
      payloadCreator?.(rawPayload, rawMeta, type) ?? (rawPayload as P);
    const meta = metaCreator?.(rawPayload, rawMeta, type) ?? (rawMeta as M);

    if (typeof payload !== 'undefined') {
      action.payload = payload;

      if (payload instanceof Error) {
        action.error = true;
      }
    }

    if (typeof meta !== 'undefined') {
      action.meta = meta;
    }

    return action;
  };

  if (process.env.NODE_ENV !== 'production') {
    Object.defineProperty($creator, 'name', {
      configurable: true,
      value: `action('${type}')`,
    });
  }

  Object.defineProperty($creator, 'toString', {
    value: () => type,
  });

  $creator.type = type;

  return $creator;
}
