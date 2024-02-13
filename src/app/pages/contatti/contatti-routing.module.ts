import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContattiPage } from './contatti.page';

const routes: Routes = [
  {
    path: '',
    component: ContattiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContattiPageRoutingModule {}
