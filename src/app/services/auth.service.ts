import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ApiService } from './api.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public router: Router, public auth: AngularFireAuth, private api: ApiService) {     

  }

  login(type, data = null) {
    var self = this
    switch (type) {
      case 'google':
        this.auth.signInWithPopup(new auth.GoogleAuthProvider());
        break;
      case 'email':
        return this.auth.signInWithEmailAndPassword(data.email, data.password)    
      default:
        break;
    }
    
   }
  register() { }
  logout() {
    this.auth.signOut()
   }
  getCurrentUser() {
    
   }

  

}
