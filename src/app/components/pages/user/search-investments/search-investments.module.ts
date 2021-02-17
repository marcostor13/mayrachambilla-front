import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchInvestmentsRoutingModule } from './search-investments-routing.module';
import { SearchInvestmentsComponent } from './search-investments.component';
import { MenuModule } from '../../../partials/menu/menu.module';
import { HeaderModule } from '../../../partials/header/header.module';
import { LoadModule } from 'src/app/components/partials/load/load.module';

@NgModule({
  declarations: [SearchInvestmentsComponent],
  imports: [
    CommonModule,
    SearchInvestmentsRoutingModule,
    MenuModule,  
    HeaderModule,
    LoadModule
  ]
})
export class SearchInvestmentsModule { }
