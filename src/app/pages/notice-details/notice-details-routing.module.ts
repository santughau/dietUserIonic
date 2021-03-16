import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticeDetailsPage } from './notice-details.page';

const routes: Routes = [
  {
    path: '',
    component: NoticeDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticeDetailsPageRoutingModule {}
