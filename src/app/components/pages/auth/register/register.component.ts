import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UsersService } from './../../../../services/users.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  response: String = ''
  form: any = {
    displayName: '',
    email: '',
    password: '',
    role: ''    
  }
  isLoad: Boolean = false
  error: Boolean = false
 

  constructor(
    private router: Router, 
    private usersService: UsersService,
    private api: ApiService
    ) {}
 

  ngOnInit(): void {}

  validateForm():boolean{    
    if (
      this.form.displayName === '' || 
      this.form.email === '' ||
      this.form.email.indexOf('@') === -1 || 
      this.form.password === '' || 
      this.form.password.length < 8      
      ){
      if (this.form.password.length < 8){
        this.response = 'La contrasema debe tener al menos 8 dígitos'
      }else{
        this.response = 'Verifique sus datos'
      }
      this.isLoad = false
      return false    
    }else{
      return true
    }
  }

  onRegister(){    
    this.isLoad = true
    this.response = ''
    
    
    if (this.validateForm() === true) {
        this.form.role = 'admin'
        this.usersService.create(this.form).subscribe((result: any) => {
          this.isLoad = false
          const self = this
          this.api.c('Onregister', result)
          if (result) {            
            this.response = 'Usuario Registrado'
            setTimeout(function () {
              self.router.navigate(['/auth/login']);
            }, 3000)            
          }
        },
          error => {
            this.isLoad = false
            this.api.c('Error', error)
            if (error.error.message.indexOf('email address is already in use by another account')> -1){
              this.error = false
              this.response = 'El email ya existe, por favor ingrese otro'
            }else{              
              this.error = false
              this.response = 'Error al registrarse, inténtelo de nuevo o comuníquese con nosotros.'             
            }

          });    

    }
  }

  get name() { return this.form.get('name') }
  get email() { return this.form.get('email') }
  get password() { return this.form.get('password') }
  get repassword() { return this.form.get('repassword') }

  



}
