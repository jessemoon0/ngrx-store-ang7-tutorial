import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { CoursesService } from './courses.service';
import { AppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { selectCourseById } from '../courses.selectors';
import { filter, first, tap } from 'rxjs/operators';
import { CourseRequested } from '../courses.actions';

@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor(private coursesService: CoursesService, private store: Store<AppState>) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
      
        // return this.coursesService.findCourseById(route.params['id']);
      const courseId = route.params['id'];
      
      return this.store
        .pipe(
          select(selectCourseById(courseId)),
          // If the course is not present in the store
          tap(course => {
            if (!course) {
              this.store.dispatch(new CourseRequested({courseId}));
            }
          }),
          // If there is no course
          filter(course => !!course),
          // Make sure the operation completes
          first()
        );
    }

}

