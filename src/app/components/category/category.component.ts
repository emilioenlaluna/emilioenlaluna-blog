import { Component,OnInit } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { Blog } from '../../shared/blog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
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
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      this.searchTerm = params.get('s') || '';

      if (category) {
        this.getFilteredBlogsByCategory(category);
      } else {
        this.getAllBlogs();
      }
    });
  }

  getFilteredBlogsByCategory(category: string) {
    this.crudApi.GetBlogsByCategory(category).subscribe((data: any[]) => {
      this.Blogg = data;
      this.filterBlogg();
      this.preLoader = false;
      this.hideWhenNoBlogg = this.filteredBlogg.length > 0;
      this.noData = this.filteredBlogg.length === 0;
    });
  }

  getAllBlogs() {
    this.crudApi.GetBloggsList().valueChanges().subscribe((data: any[]) => {
      this.Blogg = data;
      this.filterBlogg();
      this.preLoader = false;
      this.hideWhenNoBlogg = this.filteredBlogg.length > 0;
      this.noData = this.filteredBlogg.length === 0;
    });
  }

  filterBlogg() {
    if (this.searchTerm) {
      this.filteredBlogg = this.Blogg.filter((blog: Blog) =>
        (blog.title && blog.title.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (blog.intro && blog.intro.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (blog.category && blog.category.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (blog.body && blog.body.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    } else {
      this.filteredBlogg = this.Blogg;
    }
  }
}
