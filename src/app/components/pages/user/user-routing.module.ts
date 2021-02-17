import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../../guards/auth.guard'

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'search-investments',
    loadChildren: () => import('./search-investments/search-investments.module').then(m => m.SearchInvestmentsModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'myinvestments',
    loadChildren: () => import('./myinvestments/myinvestments.module').then(m => m.MyinvestmentsModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },


  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
