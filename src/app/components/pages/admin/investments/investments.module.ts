import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestmentsRoutingModule } from './investments-routing.module';

import { MenuModule } from '../../../partials/menu/menu.module';
import { HeaderModule } from '../../../partials/header/header.module';
import { InvestmentsComponent } from './investments.component';

@NgModule({
  declarations: [
    InvestmentsComponent
  ],
  imports: [
    CommonModule,
    InvestmentsRoutingModule,
    MenuModule,
    HeaderModule
  ]
})
export class InvestmentsModule { }
