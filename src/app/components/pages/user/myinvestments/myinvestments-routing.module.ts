import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyinvestmentsComponent } from './myinvestments.component';

const routes: Routes = [
  {
    path: '',
    component: MyinvestmentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyinvestmentsRoutingModule { }
