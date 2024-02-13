
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrormodalComponent } from './errormodal.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  declarations: [ErrormodalComponent],
  exports: [ErrormodalComponent],
})
export class ErrormodalModule { }