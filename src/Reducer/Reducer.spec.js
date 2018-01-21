import { createReducer, createAction } from '../redux-fluent';


describe('createReducer', () => {
  it('createReducer() should return: { configs, case, default }', () => {
    expect(createReducer('foo'))
      .toHaveProperty('config', jasmine.any(Function));

    expect(createReducer('foo'))
      .toHaveProperty('case', jasmine.any(Function));

    expect(createReducer('foo'))
      .toHaveProperty('default', jasmine.any(Function));
  });

  it('createReducer.default() should return a reducer', () => {
    const macro = (...args) => {
      args.forEach((arg) => {
        const fn = createReducer('foo').default(arg);

        expect(fn).toEqual(jasmine.any(Function));
        expect(fn()).toEqual(jasmine.any(Object));
      });
    };

    macro({}, () => ({}), undefined);
    expect(createReducer('foo').config().default()).toEqual(jasmine.any(Function));
  });

  it('createReducer.default() should return a function with a property domain', () => {
    const domain = 'baz';

    expect(createReducer(domain).default(() => ({})))
      .toHaveProperty('domain', domain);

    expect(createReducer(domain).default(() => ({})).toString())
      .toEqual(domain);
  });

  it('createReducer.config() should return { case, default }', () => {
    expect(createReducer('foo').config({}))
      .toHaveProperty('case', jasmine.any(Function));

    expect(createReducer('foo').config({}))
      .toHaveProperty('default', jasmine.any(Function));
  });

  it('createReducer.case() should recursively return { case, do }', () => {
    /* eslint-disable no-param-reassign, no-plusplus */

    const addCases = (obj, times) => (
      --times ? addCases(obj.case({}), times) : obj
    );

    const addDos = (obj, times) => (
      --times ? addDos(obj.do({}), times) : obj
    );


    expect(addCases(createReducer('foo').case({}), 7)).toHaveProperty('case', jasmine.any(Function));
    expect(addCases(createReducer('foo').case({}), 32)).toHaveProperty('do', jasmine.any(Function));

    expect(addCases(createReducer('foo').config().case({}), 32)).toHaveProperty('do', jasmine.any(Function));

    expect(addDos(createReducer('foo').case({}), 7)).toHaveProperty('case', jasmine.any(Function));
    expect(addDos(createReducer('foo').case({}), 32)).toHaveProperty('do', jasmine.any(Function));
  });

  it('createReducer.catch() should handle only error actions', () => {
    const addTodo = createAction('@todos | add');
    const handler = jasmine.createSpy('catch action error');

    const reducer = createReducer('@@catch')
      .case(addTodo)
      .catch(handler)

      .default();

    reducer({}, addTodo({ id: 'foo' }));
    expect(handler).not.toHaveBeenCalled();

    reducer({}, addTodo(new Error('unable to add todo')));
    expect(handler).toHaveBeenCalled();
  });

  it('createReducer.catch() should handle only success actions', () => {
    const addTodo = createAction('@todos | add');
    const handler = jasmine.createSpy('catch action error');

    const reducer = createReducer('@@catch')
      .case(addTodo)
      .then(handler)

      .default();


    reducer({}, addTodo(new Error('unable to add todo')));
    expect(handler).not.toHaveBeenCalled();

    reducer({}, addTodo({ id: 'foo' }));
    expect(handler).toHaveBeenCalled();
  });
});
