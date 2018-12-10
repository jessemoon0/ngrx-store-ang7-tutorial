import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CourseLoaded, CourseRequested, CoursesActionTypes } from './courses.actions';
import { map, mergeMap } from 'rxjs/operators';
import { CoursesService } from './services/courses.service';


@Injectable()
export class CourseEffects {
  
  @Effect()
    loadCourse$ = this.actions$.pipe(
      ofType<CourseRequested>(CoursesActionTypes.CourseRequested),
      mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)),
      map(course => new CourseLoaded({course}))
    );
  
  constructor(private actions$: Actions, private coursesService: CoursesService) {}
}
