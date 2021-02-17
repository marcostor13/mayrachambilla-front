import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestmentsRequestComponent } from './investments-request.component';

const routes: Routes = [
  {
    path: '',
    component: InvestmentsRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentsRequestRoutingModule { }
