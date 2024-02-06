import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookreservationPage } from './bookreservation.page';

const routes: Routes = [
  {
    path: '',
    component: BookreservationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookreservationPageRoutingModule {}
