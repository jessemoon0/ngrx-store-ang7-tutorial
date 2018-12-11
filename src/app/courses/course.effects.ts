import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AllCoursesLoaded, AllCoursesRequested, CourseLoaded, CourseRequested, CoursesActionTypes } from './courses.actions';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { CoursesService } from './services/courses.service';
import { Course } from './model/course';
import { AppState } from '../reducers';
import { select, Store } from '@ngrx/store';
import { haveAllCoursesBeenLoaded } from './courses.selectors';


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
  
  constructor(private actions$: Actions, private coursesService: CoursesService, private store: Store<AppState>) {}
}
