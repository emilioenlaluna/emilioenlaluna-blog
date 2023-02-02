import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CrudService } from '../shared/crud.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  constructor(
    private actRoute: ActivatedRoute,
    public serviceCrud:CrudService
  ) {
    const id= this.actRoute.snapshot.paramMap.get('id');
    
   }
  datos: any;
  
  ngOnInit() {
    
    
  }

  


}