/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAction } from './create-action';

/*
 * The idea behind this test is to
 * have all the possible call combinations
 * so that `ts-jest` typescript's type checking
 * would fail in case of issues.
 *
 * `creator.type === 'type'` instead of `toHaveProperty(k, v)`
 */

describe('createAction(type)', () => {
  it('creator()', () => {
    const creator = createAction<'type'>('type');
    expect(creator.type === 'type').toBeTruthy();

    expect(creator().type === 'type').toBeTruthy();
    expect(creator().error === undefined).toBeTruthy();
    expect(creator().payload === undefined).toBeTruthy();
    expect(creator().meta === undefined).toBeTruthy();
  });

  it('creator(payload)', () => {
    const creator = createAction<'type', 'payload'>('type');
    expect(creator.type === 'type').toBeTruthy();

    expect(creator('payload').type === 'type').toBeTruthy();
    expect(creator('payload').error === undefined).toBeTruthy();
    expect(creator('payload').payload === 'payload').toBeTruthy();
    expect(creator('payload').meta === undefined).toBeTruthy();
  });

  it('creator(payload, meta)', () => {
    const creator = createAction<'type', 'payload', 'meta'>('type');
    expect(creator.type === 'type').toBeTruthy();

    expect(creator('payload', 'meta').type === 'type').toBeTruthy();
    expect(creator('payload', 'meta').error === undefined).toBeTruthy();
    expect(creator('payload', 'meta').payload === 'payload').toBeTruthy();
    expect(creator('payload', 'meta').meta === 'meta').toBeTruthy();
  });

  it('creator(error)', () => {
    const creator = createAction<'type', 'payload'>('type');
    expect(creator.type === 'type').toBeTruthy();

    expect(creator(new Error('test')).type === 'type').toBeTruthy();
    expect(creator(new Error('test')).error === true).toBeTruthy();
    expect(creator(new Error('test')).payload instanceof Error).toBeTruthy();
    expect(creator(new Error('test')).meta === undefined).toBeTruthy();
  });

  it('creator(error, meta)', () => {
    const creator = createAction<'type', 'payload', 'meta'>('type');
    expect(creator.type === 'type').toBeTruthy();

    expect(creator(new Error('test'), 'meta').type === 'type').toBeTruthy();
    expect(creator(new Error('test'), 'meta').error === true).toBeTruthy();
    expect(
      creator(new Error('test'), 'meta').payload instanceof Error,
    ).toBeTruthy();
    expect(creator(new Error('test'), 'meta').meta === 'meta').toBeTruthy();
  });
});

describe('createAction(type, payloadCreator)', () => {
  it('creator()', () => {
    const creator = createAction<'type', 'payload', void, void>('type', () => 'payload');
    expect(creator.type === 'type').toBeTruthy();

    expect(creator().type === 'type').toBeTruthy();
    expect(creator().error === undefined).toBeTruthy();
    expect(creator().payload === 'payload').toBeTruthy();
    expect(creator().meta === undefined).toBeTruthy();
  });

  it('creator(payload)', () => {
    const creator = createAction<'type', 'payload', void, string>(
      'type',
      (prefix) => `${prefix}load` as 'payload',
    );
    expect(creator.type === 'type').toBeTruthy();

    expect(creator('pay').type === 'type').toBeTruthy();
    expect(creator('pay').error === undefined).toBeTruthy();
    expect(creator('pay').payload === 'payload').toBeTruthy();
    expect(creator('pay').meta === undefined).toBeTruthy();
  });

  it('creator(payload, meta)', () => {
    const creator = createAction<'type', 'payload', 'meta', string, string>(
      'type',
      (prefix) => `${prefix}load` as 'payload',
    );
    expect(creator.type === 'type').toBeTruthy();

    expect(creator('pay', 'meta').type === 'type').toBeTruthy();
    expect(creator('pay', 'meta').error === undefined).toBeTruthy();
    expect(creator('pay', 'meta').payload === 'payload').toBeTruthy();
    expect(creator('pay', 'meta').meta === 'meta').toBeTruthy();
  });
});

describe('createAction(type, payloadCreator, metaCreator)', () => {
  it('creator()', () => {
    const creator = createAction<'type', 'payload', 'meta', void, void>(
      'type',
      () => 'payload',
      () => 'meta',
    );
    expect(creator.type === 'type').toBeTruthy();

    expect(creator().type === 'type').toBeTruthy();
    expect(creator().error === undefined).toBeTruthy();
    expect(creator().payload === 'payload').toBeTruthy();
    expect(creator().meta === 'meta').toBeTruthy();
  });

  it('creator(payload, meta)', () => {
    const creator = createAction<'type', 'payload', 'meta', string, string>(
      'type',
      (prefix) => `${prefix}load` as 'payload',
      (_, prefix) => `${prefix}ta` as 'meta',
    );
    expect(creator.type === 'type').toBeTruthy();

    expect(creator('pay', 'me').type === 'type').toBeTruthy();
    expect(creator('pay', 'me').error === undefined).toBeTruthy();
    expect(creator('pay', 'me').payload === 'payload').toBeTruthy();
    expect(creator('pay', 'me').meta === 'meta').toBeTruthy();
  });
});
