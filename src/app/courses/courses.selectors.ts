import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './courses.reducer';

import * as fromCourse from './courses.reducer';
import { Course } from './model/course';

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const selectCourseById = (courseId: number) => createSelector(
  selectCoursesState,
  coursesState => coursesState.entities[courseId]
);

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourse.selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  courses => courses.filter((course: Course) => course.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  courses => courses.filter((course: Course) => course.category === 'ADVANCED')
);

export const selectPromoTotals = createSelector(
  selectAllCourses,
  courses => courses.filter((course: Course) => course.promo).length
);

export const haveAllCoursesBeenLoaded = createSelector(
  selectCoursesState,
  coursesState => coursesState.allCoursesHaveBeenLoaded
);
