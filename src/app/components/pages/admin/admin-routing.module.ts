import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../../guards/auth.guard'


const routes: Routes = [

  {
    path: 'investments',
    loadChildren: () => import('./investments/investments.module').then(m => m.InvestmentsModule),
    canActivate: [AuthGuard]
  },  
  {
    path: 'investments-request/:id',
    loadChildren: () => import('./investments-request/investments-request.module').then(m => m.InvestmentsRequestModule),
    canActivate: [AuthGuard]
  }, 

  {
    path: '',
    redirectTo: 'investments',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
