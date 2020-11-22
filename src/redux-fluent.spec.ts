import { createAction, ofType, createReducer } from './redux-fluent';

describe('redux-fluent', () => {
  describe('Smoke Test', () => {
    it('should export a function { createAction }', () => {
      expect(createAction).toBeInstanceOf(Function);
    });

    it('should export a function { ofType }', () => {
      expect(ofType).toBeInstanceOf(Function);
    });

    it('should export a function { createReducer }', () => {
      expect(createReducer).toBeInstanceOf(Function);
    });
  });
});
