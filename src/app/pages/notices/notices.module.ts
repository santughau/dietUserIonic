import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticesPageRoutingModule } from './notices-routing.module';

import { NoticesPage } from './notices.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    Ng2SearchPipeModule, 
    FormsModule,
    IonicModule,
    NoticesPageRoutingModule,
  ],
  declarations: [NoticesPage],
})
export class NoticesPageModule {}
