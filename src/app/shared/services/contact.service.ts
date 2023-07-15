import { Injectable } from '@angular/core';
import { Contact } from '../contact';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contactsRef: AngularFireList<any> | any;
 

  constructor(private db: AngularFireDatabase) {}
  AddContact(contact: Contact) {
    this.contactsRef=this.db.list('/contact');
    if(contact){
      this.contactsRef.push({
        nombre: contact.nombre,
        correo: contact.correo,
        asunto: contact.asunto,
        numero: contact.numero,
        descripcion: contact.descripcion,
      });
      Swal.fire(
        'Sent',
        'I will answer as soon as I can',
        'success'
      )
    } 
  }
}

