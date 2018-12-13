import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './courses.reducer';

import * as fromCourse from './courses.reducer';
import * as fromLessons from './lessons.reducer';
import { Course } from './model/course';
import { IPageQuery } from './model/Page.interface';
import { LessonsState } from './lessons.reducer';

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

// LESSONS SELECTORS

export const selectLessonsState = createFeatureSelector<LessonsState>('lessons');

export const selectAllLessons = createSelector(
  selectLessonsState,
  fromLessons.selectAll
);

export const selectLessonsPage = (courseId: number, page: IPageQuery) => createSelector(
  selectAllLessons,
  allLessons => {
    const start = page.pageIndex * page.pageSize,
          end = start + page.pageSize;

    return allLessons
      .filter((lessons) => lessons.courseId === courseId).slice(start, end);
  }
);
