import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrormodalComponent } from './errormodal.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ErrormodalComponent],
  exports: [ErrormodalComponent],
})
export class ErrormodalModule {}
