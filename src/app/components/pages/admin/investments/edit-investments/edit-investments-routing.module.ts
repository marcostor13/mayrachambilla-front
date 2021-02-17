import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditInvestmentsComponent } from './edit-investments.component';

const routes: Routes = [
  {
    path: '',
    component: EditInvestmentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditInvestmentsRoutingModule { }
