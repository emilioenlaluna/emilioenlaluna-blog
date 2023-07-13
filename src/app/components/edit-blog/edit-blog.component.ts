import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../shared/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {
  blogForm: FormGroup|any;
  constructor(
    private crudApi: CrudService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.updateBloggData();
    const id= this.actRoute.snapshot.paramMap.get('id');
    this.crudApi
      .GetBlogg(id)
      .valueChanges()
      .subscribe((data: any) => {
        this.blogForm.setValue(data);
      });
  }
  
  get title() {
    return this.blogForm.get('title');
  }
  get intro() {
    return this.blogForm.get('intro');
  }
  get body() {
    return this.blogForm.get('body');
  }
  get final() {
    return this.blogForm.get('final');
  }

  get image() {
    return this.blogForm.get('image');
  }

  get imagealternative() {
    return this.blogForm.get('imagealternative');
  }
  get author() {
    return this.blogForm.get('author');
  }

  get date() {
    return this.blogForm.get('date');
  }

  updateBloggData() {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      intro: ['',[Validators.required]],
      body: ['',[Validators.required]],
      final: ['',[Validators.required]],
      image: ['',[Validators.required]],
      imagealternative: ['',[Validators.required]],
      author: ['@emilioenlaluna',[Validators.required]],
      date: ['',[Validators.required]],
    });
  }
  goBack() {
    this.location.back();
  }
  updateForm() {
    this.crudApi.UpdateBlogg(this.blogForm.value);
    this.toastr.success(
      this.blogForm.controls['title'].value + ' updated successfully'
    );
    this.router.navigate(['view-students']);
  }
}