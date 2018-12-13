import { Action } from '@ngrx/store';
import { Course } from './model/course';
import { Update } from '@ngrx/entity';
import { IPageQuery } from './model/Page.interface';
import { Lesson } from './model/lesson';

export enum CoursesActionTypes {
  CourseRequested = '[View Course Page] Course Requested',
  CourseLoaded = '[Courses API] Course Loaded',
  AllCoursesRequested = '[Courses Home Page] All Courses Requested',
  AllCoursesLoaded = '[Courses API] ALL Courses Loaded',
  CourseSaved = '[Edit Course Dialog] Course Saved',

  LessonsPageRequested = '[Single Course Landing Page] Lessons Page Requested',
  LessonsPageLoaded = '[Courses API] Lessons Page Loaded',
  LessonsPageCanceled = '[Courses API] Lessons Page Canceled'
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

export class CourseSaved implements Action {
  readonly type = CoursesActionTypes.CourseSaved;
  constructor(public payload: {course: Update<Course>}) {}
}

// LESSONS ACTIONS

export class LessonsPageRequested implements Action {
  readonly type = CoursesActionTypes.LessonsPageRequested;
  constructor(public payload: { courseId: number, page: IPageQuery }) {}
}

export class LessonsPageLoaded implements Action {
  readonly type = CoursesActionTypes.LessonsPageLoaded;
  constructor(public payload: { lessons: Lesson[] }) {}
}

export class LessonsPageCanceled implements Action {
  readonly type = CoursesActionTypes.LessonsPageCanceled;
}

export type CourseActions =
  CourseRequested |
  CourseLoaded |
  AllCoursesRequested |
  AllCoursesLoaded |
  CourseSaved |
  LessonsPageRequested |
  LessonsPageLoaded |
  LessonsPageCanceled;
