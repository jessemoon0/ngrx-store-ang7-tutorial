import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Course} from '../model/course';
import {CoursesService} from '../services/courses.service';
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge, fromEvent} from 'rxjs';
import {LessonsDataSource} from '../services/lessons.datasource';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { IPageQuery } from '../model/Page.interface';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    course: Course;

    dataSource: LessonsDataSource;

    displayedColumns = ['seqNo', 'description', 'duration'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    
    constructor(
      private route: ActivatedRoute,
      private coursesService: CoursesService,
      private store: Store<AppState>
    ) {}

    ngOnInit() {
      this.course = this.route.snapshot.data['course'];
      // this.dataSource = new LessonsDataSource(this.coursesService);
      // this.dataSource.loadLessons(this.course.id, 0, 3);
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

    loadLessonsPage() {
      this.dataSource.loadLessons(
        this.course.id,
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
    }


}
