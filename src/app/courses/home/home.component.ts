import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { AppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { selectAdvancedCourses, selectBeginnerCourses, selectPromoTotals } from '../courses.selectors';
import { AllCoursesRequested } from '../courses.actions';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
      
      this.store.dispatch(new AllCoursesRequested());
      
      // If we want to select all courses
      // const courses$ = this.store.pipe(
      //   select(selectAllCourses)
      // );
      
      this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));
      this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));
      this.promoTotal$ = this.store.pipe(select(selectPromoTotals));
  
      // THE WAY IT WAS BEFORE THE STORE
      // const courses$ = this.coursesService.findAllCourses();

      // this.beginnerCourses$ = courses$.pipe(
      //   map(courses => courses.filter(course => course.category === 'BEGINNER') )
      // );
      //
      // this.advancedCourses$ = courses$.pipe(
      //     map(courses => courses.filter(course => course.category === 'ADVANCED') )
      // );
      //
      // this.promoTotal$ = courses$.pipe(
      //     map(courses => courses.filter(course => course.promo).length)
      // );

    }

}
