import { Course } from './model/course';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CourseActions, CoursesActionTypes } from './courses.actions';


export interface CoursesState extends EntityState<Course> {
  // coursesEntities: {[key: number]: Course};
  // coursesOrder: number[];
  allCoursesHaveBeenLoaded: boolean;
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

// export const initialCoursesState: CoursesState = adapter.getInitialState();
// We need to add the custom allCoursesHaveBeenLoaded initial state:
export const initialCoursesState = adapter.getInitialState({
  allCoursesHaveBeenLoaded: false
});

export function coursesReducer(state = initialCoursesState, action: CourseActions): CoursesState {
  switch (action.type) {
    case CoursesActionTypes.CourseLoaded:
      return adapter.addOne(action.payload.course, state);
    case CoursesActionTypes.AllCoursesLoaded:
      return adapter.addAll(action.payload.courses, {...state, allCoursesHaveBeenLoaded: true});
    case CoursesActionTypes.CourseSaved:
      return adapter.updateOne(action.payload.course, state);
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
