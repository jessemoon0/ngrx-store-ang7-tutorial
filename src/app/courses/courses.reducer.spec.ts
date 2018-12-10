import { coursesReducer, initialState } from './courses.reducer';

describe('Course Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = coursesReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
