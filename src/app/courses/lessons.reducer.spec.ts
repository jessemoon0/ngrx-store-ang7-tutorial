import { lessonsReducer, initialLessonsState } from './lessons.reducer';

describe('Lesson Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = lessonsReducer(initialLessonsState, action);

      expect(result).toBe(initialLessonsState);
    });
  });
});
