import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../../../services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter, switchMap } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  response: String = ''
  isLoad: Boolean = false

  data:any = {
    email: '',
    password: '', 
  }

  constructor(
    public router: Router, 
    private api: ApiService, 
    public authService: AuthService, 
    public auth: AngularFireAuth,
    private userService: UsersService,
    ) {
    this.validateSession()
  } 

  ngOnInit(): void { }

  validateSession() {
    // this.auth.onAuthStateChanged((user: any) => {
    //   if (user) {
    //     this.router.navigate(['/user/dashboard'])          
    //   }
    // })

    this.auth.user.pipe(
      filter(user => !!user),
      switchMap(user => this.userService.user$(user.uid))
    ).subscribe((user: any) => {
      console.log('USER', user)
      this.api.c('USER', user)
      if (user.role === 'user') {
        this.router.navigate(['/user'])
      } else if (user.role === 'admin'){
        this.router.navigate(['/admin'])
      }
    })

  }


  onLogin() {    

    if (this.data.email != '' && this.data.password != '') {
      this.isLoad = true
      this.response = ''      
      
      this.authService.login('email', this.data)
        .then((result: any) => {
          this.isLoad = false
          this.validateSession()
          this.api.c('login mail result', result)
        }).catch((error) => {
          this.isLoad = false
          this.api.c('login mail error', error)
          if (error.code == "auth/user-not-found") {
            this.response = 'El usuario no existe'
          }
          if (error.code == "auth/wrong-password") {
            this.response = 'Revise sus credenciales'
          }
        });;
    }else{
      this.response = 'Debe completar todos los campos'
    }
  }



}
