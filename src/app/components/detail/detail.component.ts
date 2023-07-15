import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnInit {
  blogData: any;

  constructor(
    private crudApi: CrudService,
    private location: Location,
    private actRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit() {
    
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.crudApi
      .GetBlogg(id)
      .valueChanges()
      .subscribe((data: any) => {
        if (data) {
          this.blogData = data;
        this.titleService.setTitle('emilioenlaluna blogs'+data.title);
        } else {
          // Si no se encuentra ningún dato, redirecciona a la página 404
          this.router.navigate(['/404']); // Asegúrate de tener la ruta definida para la página 404
        }
        
      });
  }

  get title() {
    return this.blogData ? this.blogData.title : '';
  }

  get intro() {
    return this.blogData ? this.blogData.intro : '';
  }

  get body() {
    return this.blogData ? this.blogData.body : '';
  }

  get final() {
    return this.blogData ? this.blogData.final : '';
  }

  get image() {
    return this.blogData ? this.blogData.image : '';
  }

  get imagealternative() {
    return this.blogData ? this.blogData.imagealternative : '';
  }

  get author() {
    return this.blogData ? this.blogData.author : '';
  }

  get date() {
    return this.blogData ? this.blogData.date : '';
  }
  get category() {
    return this.blogData ? this.blogData.category : '';
  }

 
}
