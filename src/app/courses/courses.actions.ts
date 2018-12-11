import { Action } from '@ngrx/store';
import { Course } from './model/course';

export enum CoursesActionTypes {
  CourseRequested = '[View Course Page] Course Requested',
  CourseLoaded = '[Courses API] Course Loaded',
  AllCoursesRequested = '[Courses Home Page] All Courses Requested',
  AllCoursesLoaded = '[Courses API] ALL Courses Loaded',
}

export class CourseRequested implements Action {
  readonly type = CoursesActionTypes.CourseRequested;
  constructor(public payload: { courseId: number }) {}
}

export class CourseLoaded implements Action {
  readonly type = CoursesActionTypes.CourseLoaded;
  constructor(public payload: { course: Course }) {}
}

export class AllCoursesRequested implements Action {
  readonly type = CoursesActionTypes.AllCoursesRequested;
}

export class AllCoursesLoaded implements Action {
  readonly type = CoursesActionTypes.AllCoursesLoaded;
  constructor(public payload: { courses: Course[] }) {}
}

export type CourseActions = CourseRequested | CourseLoaded | AllCoursesRequested | AllCoursesLoaded;
