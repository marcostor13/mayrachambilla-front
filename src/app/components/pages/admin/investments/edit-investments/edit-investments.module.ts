import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditInvestmentsRoutingModule } from './edit-investments-routing.module';
import { EditInvestmentsComponent } from './edit-investments.component';
import { MenuModule } from 'src/app/components/partials/menu/menu.module';
import { HeaderModule } from 'src/app/components/partials/header/header.module';
import { FormsModule } from '@angular/forms';
import { LoadModule } from 'src/app/components/partials/load/load.module';


@NgModule({
  declarations: [EditInvestmentsComponent],
  imports: [
    CommonModule,
    EditInvestmentsRoutingModule,
    MenuModule,
    HeaderModule,
    FormsModule,
    LoadModule
  ]
})
export class EditInvestmentsModule { }
