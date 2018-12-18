import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  AllCoursesLoaded,
  AllCoursesRequested,
  CourseLoaded,
  CourseRequested,
  CoursesActionTypes, LessonsPageCanceled, LessonsPageLoaded,
  LessonsPageRequested
} from './courses.actions';
import { catchError, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { CoursesService } from './services/courses.service';
import { Course } from './model/course';
import { AppState } from '../reducers';
import { select, Store } from '@ngrx/store';
import { haveAllCoursesBeenLoaded } from './courses.selectors';
import { of } from 'rxjs';


@Injectable()
export class CourseEffects {
  
  @Effect()
    loadCourse$ = this.actions$.pipe(
      ofType<CourseRequested>(CoursesActionTypes.CourseRequested),
      mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)),
      map((course: Course) => new CourseLoaded({course}))
    );
  
  @Effect()
    loadAllCourses$ = this.actions$.pipe(
      ofType<AllCoursesRequested>(CoursesActionTypes.AllCoursesRequested),
      // Combines the action with the store
      withLatestFrom(this.store.pipe(select(haveAllCoursesBeenLoaded))),
      // If there is no courses, load them from API
      filter(([action, areAllCoursesLoaded]) => !areAllCoursesLoaded),
      mergeMap(action => this.coursesService.findAllCourses()),
      map((courses: Course[] ) => new AllCoursesLoaded({courses}))
    );
  
  // Lessons Effects
  
  @Effect()
    loadLessonsPage = this.actions$.pipe(
      ofType<LessonsPageRequested>(CoursesActionTypes.LessonsPageRequested),
      mergeMap(({payload}) => {
        return this.coursesService.findLessons(payload.courseId, payload.page.pageIndex, payload.page.pageSize)
          .pipe(
            catchError(err => {
              console.log('Loading error', err);
              this.store.dispatch(new LessonsPageCanceled());
              // If Error, emit empty array
              return of([]);
            })
          );
      }),
      map((lessons) => new LessonsPageLoaded({lessons})),
    );
  
  constructor(private actions$: Actions, private coursesService: CoursesService, private store: Store<AppState>) {}
}
