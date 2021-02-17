import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MenuModule } from 'src/app/components/partials/menu/menu.module';
import { HeaderModule } from 'src/app/components/partials/header/header.module';
import { LoadModule } from 'src/app/components/partials/load/load.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
  
  CommonModule,
    ProfileRoutingModule,
    MenuModule,
    HeaderModule,
    LoadModule,
    FormsModule
  ]
})
export class ProfileModule { }
