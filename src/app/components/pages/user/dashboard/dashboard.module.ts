import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MenuModule } from '../../../partials/menu/menu.module';
import { HeaderModule } from '../../../partials/header/header.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MenuModule,
    HeaderModule
  ]
})
export class DashboardModule { }
