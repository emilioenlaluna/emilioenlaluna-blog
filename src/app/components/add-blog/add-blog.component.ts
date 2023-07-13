import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss'],
})
export class AddBlogComponent implements OnInit {
  public blogForm: FormGroup | any;

  constructor(
    public crudApi: CrudService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) { }
  ngOnInit() {
    this.crudApi.GetBloggsList();
    this.bloggForm();
  }

  
  bloggForm() {
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
  /*
title: blog.title,
      intro: blog.intro,
      body: blog.body,
      final: blog.final,
      image: blog.image,
      imagealternative: blog.imagealternative,
      author: blog.author,
      date: blog.date

        $key: string;
    title: string;
    intro: string;
    body: string;
    final: string;
    image: string;
    imagealternative: string;
    author: string;
    date: Date;

  */

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

  ResetForm() {
    this.blogForm.reset();
  }
  submitBloggData() {
    this.crudApi.AddBlogg(this.blogForm.value);
    this.toastr.success(
      this.blogForm.controls['title'].value + ' successfully added!'
    );
    this.ResetForm();
  }
}