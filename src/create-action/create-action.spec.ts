import { createAction } from './create-action';

describe('Action', () => {
  it('should export a function { createAction }', () => {
    expect(createAction).toBeInstanceOf(Function);
  });

  it('should have a name', () => {
    const type = 'foo';

    expect(createAction(type)).toHaveProperty('name', `action('${type}')`);
  });

  it('should have a type', () => {
    const type = 'bar';

    expect(createAction(type)).toHaveProperty('type', type);
  });

  it('toString() should return type', () => {
    const type = 'hello world';

    expect(createAction(type).toString()).toStrictEqual(type);
  });

  describe('actionCreator', () => {
    it('should call creators with payload, meta, type', () => {
      const type = 'foo';
      const payloadCreator = jest.fn().mockName('payloadCreator');
      const metaCreator = jest.fn().mockName('metaCreator');
      const action = createAction(type, payloadCreator, metaCreator);

      const payload = 'hello';
      const meta = 'world';
      action(payload, meta);

      expect(payloadCreator).toHaveBeenCalledWith(payload, meta, type);
      expect(metaCreator).toHaveBeenCalledWith(payload, meta, type);
    });

    it('should work with no creators', () => {
      const type = 'greetings';
      const say = createAction<string, string, string>(type);

      const payload = 'hello';
      const meta = 'world';
      const action = say(payload, meta);

      expect(action).toHaveProperty('payload', payload);
      expect(action).toHaveProperty('meta', meta);
      expect(action).toHaveProperty('type', type);
    });

    it('should handle errors', () => {
      const type = 'greetings';
      const say = createAction<'greetings', 'PayloadExample'>(type);

      const payload = new Error('something went wrong!!');
      const action = say(payload);

      expect(action).toHaveProperty('payload', payload);
      expect(action).toHaveProperty('type', type);
      expect(action).toHaveProperty('error', true);

      expect(action.payload).toBeInstanceOf(Error);
    });
  });
});
