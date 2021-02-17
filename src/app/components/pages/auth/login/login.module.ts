import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { RouterModule } from '@angular/router';
import { LoadModule } from 'src/app/components/partials/load/load.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    RouterModule,
    LoadModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
