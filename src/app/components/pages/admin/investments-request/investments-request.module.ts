import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestmentsRequestRoutingModule } from './investments-request-routing.module';
import { InvestmentsRequestComponent } from './investments-request.component';
import { MenuModule } from '../../../partials/menu/menu.module';
import { HeaderModule } from '../../../partials/header/header.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InvestmentsRequestComponent],
  imports: [
  
  CommonModule,
    InvestmentsRequestRoutingModule,
    MenuModule,
    HeaderModule,
    NzModalModule,
    FormsModule
  ]
})
export class InvestmentsRequestModule { }
