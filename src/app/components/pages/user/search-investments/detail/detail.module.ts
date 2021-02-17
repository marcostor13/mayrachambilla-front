import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { MenuModule } from 'src/app/components/partials/menu/menu.module';
import { HeaderModule } from 'src/app/components/partials/header/header.module';
import { FormsModule } from '@angular/forms';
import { LoadModule } from 'src/app/components/partials/load/load.module';
import { CarouselModule } from 'primeng/carousel';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
    MenuModule,
    HeaderModule,
    FormsModule,
    LoadModule,
    CarouselModule,
    NzModalModule
  ]
})
export class DetailModule { }
