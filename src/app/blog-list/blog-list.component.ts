import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Blog } from './../shared/blog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  p: number = 1;
  Blogg: Blog[] | any;
  hideWhenNoBlogg: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;

  constructor(
    public crudApi: CrudService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.dataState();
    let s = this.crudApi.GetBloggsList();
    s.snapshotChanges().subscribe((data: any) => {
      this.Blogg = [];
      data.forEach((item: any) => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Blogg.push(a as Blog);
      })
    })
  }
  dataState() {
    this.crudApi.GetBloggsList().valueChanges().subscribe((data: any) => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.hideWhenNoBlogg = false;
        this.noData = true;
      } else {
        this.hideWhenNoBlogg = true;
        this.noData = false;
      }
    })
  }
  deleteStudent(Blogg: any) {
    if (window.confirm('Are sure you want to delete this student ?')) {
      this.crudApi.DeleteBlogg(Blogg.$key)
      this.toastr.success(Blogg.title + ' successfully deleted!');
    }
  }
}