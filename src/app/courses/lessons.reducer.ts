import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Lesson } from './model/lesson';
import { CourseActions, CoursesActionTypes } from './courses.actions';

export interface LessonsState extends EntityState<Lesson> {
  loading: boolean;
}

function sortByCourseAndSeqNo(l1: Lesson, l2: Lesson) {
  const compare = l1.courseId - l2.courseId;

  if (compare !== 0) {
    return compare;
  } else {
    return l1.seqNo - l2.seqNo;
  }
}

export const adapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>({
  sortComparer: sortByCourseAndSeqNo
});

export const initialLessonsState: LessonsState = adapter.getInitialState({
  loading: false
});

export function lessonsReducer(state = initialLessonsState, action: CourseActions): LessonsState {
  switch (action.type) {
    
    case CoursesActionTypes.LessonsPageCanceled:
      return {
        ...state,
        loading: false
      };
    case CoursesActionTypes.LessonsPageRequested:
      return {
        ...state,
        loading: true
      };
    case CoursesActionTypes.LessonsPageLoaded:
      return adapter.addMany(action.payload.lessons, {...state, loading: false});

    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
