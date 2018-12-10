import { Course } from './model/course';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CourseActions, CoursesActionTypes } from './courses.actions';


export interface CoursesState extends EntityState<Course> {
  // coursesEntities: {[key: number]: Course};
  // coursesOrder: number[];
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialCoursesState: CoursesState = adapter.getInitialState();

export function coursesReducer(state = initialCoursesState, action: CourseActions): CoursesState {
  switch (action.type) {
    case CoursesActionTypes.CourseLoaded:
      return adapter.addOne(action.payload.course, state);
    default:
      return state;
  }
}
