import { Injectable } from '@angular/core';
import { Blog } from '../shared/blog';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CrudService {
  blogsRef: AngularFireList<any> | any;
  blogRef: AngularFireObject<any> | any;
  /*
  itemsRef: AngularFireList<any> | undefined;
  items: Observable<any[]> | undefined;
  */
  constructor(private db: AngularFireDatabase, ) { }
  // Create blog
  AddBlogg(blog: Blog) {
    this.blogsRef.push({
      title: blog.title,
      intro: blog.intro,
      body: blog.body,
      final: blog.final,
      image: blog.image,
      imagealternative: blog.imagealternative,
      author: blog.author,
      date: blog.date
    });
  }
  // Fetch Single blog Object
  GetBlogg(id: string | any) {
    this.blogRef = this.db.object('blogs-list/' + id);
    return this.blogRef;
  }

  getSingleBLog(id:any){
    return this.db.list('/blogs-list', ref=> ref.orderByChild("title").equalTo(id)).valueChanges()
  }

  getOneBlogg(id:any): Observable<any[]> {
    return  this.db.list('/blogs-list', ref=> ref.orderByChild("title").equalTo(id)).valueChanges()
    }

  // Fetch blogs List
  GetBloggsList() {
    this.blogsRef = this.db.list('blogs-list');
    return this.blogsRef;
  }
  // Update blog Object
  UpdateBlogg(blog: Blog) {
    this.blogRef.update({
      title: blog.title,
      intro: blog.intro,
      body: blog.body,
      final: blog.final,
      image: blog.image,
      imagealternative: blog.imagealternative,
      author: blog.author,
      date: blog.date
    });
  }
  // Delete blog Object
  DeleteBlogg(id: string) {
    this.blogRef = this.db.object('blogs-list/' + id);
    this.blogRef.remove();
  }

  
  
  
}