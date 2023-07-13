import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, map} from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Blog } from '../shared/blog';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent {
  itemsRef: AngularFireList<any>;
  items$: Observable<any[]>;
  

  constructor(
     public db: AngularFireDatabase,private route: ActivatedRoute
   ){
    const Id = this.route.snapshot.paramMap.get('id');
    
      this.itemsRef = db.list('blogs-list/'+Id);
    
      this.items$ = this.itemsRef.valueChanges();
      
      this.items$.subscribe(res=> console.log(res));
   }
}