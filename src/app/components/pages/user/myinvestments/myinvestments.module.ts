import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyinvestmentsRoutingModule } from './myinvestments-routing.module';
import { MyinvestmentsComponent } from './myinvestments.component';
import { MenuModule } from 'src/app/components/partials/menu/menu.module';
import { HeaderModule } from 'src/app/components/partials/header/header.module';
import { LoadModule } from 'src/app/components/partials/load/load.module';


@NgModule({
  declarations: [MyinvestmentsComponent],
  imports: [
    CommonModule,
    MyinvestmentsRoutingModule,    
    MenuModule,
    HeaderModule,
    LoadModule
  ]
})
export class MyinvestmentsModule { }
