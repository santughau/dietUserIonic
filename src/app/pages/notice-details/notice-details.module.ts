import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticeDetailsPageRoutingModule } from './notice-details-routing.module';

import { NoticeDetailsPage } from './notice-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoticeDetailsPageRoutingModule
  ],
  declarations: [NoticeDetailsPage]
})
export class NoticeDetailsPageModule {}
