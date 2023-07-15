import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { Blog } from '../../shared/blog';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit  {
  p: number = 1;
  Blogg: Blog[] | any;
  filteredBlogg: Blog[] | any;
  hideWhenNoBlogg: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  searchTerm: string = '';

  constructor(
    public crudApi: CrudService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dataState();
    let s = this.crudApi.GetBloggsList();
    s.snapshotChanges().subscribe((data: any[]) => {
      this.Blogg = [];
      data.forEach((item: any) => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Blogg.push(a as Blog);
      });

      // Filter the Blogg based on the query parameter
      this.route.queryParams.subscribe(params => {
        this.searchTerm = params['s'];
        this.filterBlogg();
      });
    });
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
    });
  }

  filterBlogg() {
    if (this.searchTerm) {
      this.filteredBlogg = this.Blogg.filter((blog: Blog) =>
      (blog.title && blog.title.toLowerCase().includes(this.searchTerm.toLowerCase()))||
      (blog.intro && blog.intro.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      (blog.category && blog.category.toLowerCase().includes(this.searchTerm.toLowerCase()))||
      (blog.body && blog.body.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    } else {
      this.filteredBlogg = this.Blogg;
    }
  }
}

/*
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { Blog } from '../../shared/blog';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  p: number = 1;
  Blogg: Blog[] | any;
  filteredBlogg: Blog[] | any;
  hideWhenNoBlogg: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  searchTerm: string = '';

  constructor(
    public crudApi: CrudService,
    public toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dataState();
    let s = this.crudApi.GetBloggsList();
    s.snapshotChanges().subscribe((data: any[]) => {
      this.Blogg = [];
      data.forEach((item: any) => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Blogg.push(a as Blog);
      });

      // Filter the Blogg based on the query parameter
      this.route.queryParams.subscribe(params => {
        this.searchTerm = params['s'];
        this.filterBlogg();
      });
    });
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
    });
  }

  filterBlogg() {
    if (this.searchTerm) {
      this.filteredBlogg = this.Blogg.filter((blog: Blog) =>
        blog.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredBlogg = this.Blogg;
    }
  }

  deleteStudent(Blogg: any) {
    if (window.confirm('Are sure you want to delete this student ?')) {
      this.crudApi.DeleteBlogg(Blogg.$key);
      this.toastr.success(Blogg.title + ' successfully deleted!');
    }
  }
}

*/