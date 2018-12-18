import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Course} from '../model/course';
import {CoursesService} from '../services/courses.service';
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import { merge, fromEvent, Observable } from 'rxjs';
import {LessonsDataSource} from '../services/lessons.datasource';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { IPageQuery } from '../model/Page.interface';
import { selectLessonsLoading } from '../courses.selectors';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit, AfterViewInit {
  course: Course;
  dataSource: LessonsDataSource;
  displayedColumns = ['seqNo', 'description', 'duration'];
  @ViewChild(MatPaginator)
    paginator: MatPaginator;
  loading$: Observable<boolean>;
  
  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
    // this.dataSource = new LessonsDataSource(this.coursesService);
    // this.dataSource.loadLessons(this.course.id, 0, 3);
    
    this.loading$ = this.store.pipe(
      select(selectLessonsLoading())
    );
    
    this.dataSource = new LessonsDataSource(this.coursesService, this.store);
    const initialPage: IPageQuery = {
      pageIndex: 0,
      pageSize: 3
    };
    this.dataSource.loadLessons(this.course.id, initialPage);
  }

  ngAfterViewInit() {
      this.paginator.page
      .pipe(
          tap(() => this.loadLessonsPage())
      )
      .subscribe();
  }

  private loadLessonsPage() {
    const newPage: IPageQuery = {
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    };
    this.dataSource.loadLessons(
      this.course.id,
      newPage
    );
  }
  
}
