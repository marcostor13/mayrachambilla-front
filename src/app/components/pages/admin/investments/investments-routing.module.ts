import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { InvestmentsComponent } from './investments.component';

const routes: Routes = [
  {
    path: '',
    component: InvestmentsComponent
  },
  {
    path: 'edit-investments',
    loadChildren: () => import('./edit-investments/edit-investments.module').then(m => m.EditInvestmentsModule),
    canActivate: [AuthGuard]  
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentsRoutingModule { }
