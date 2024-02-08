import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrormodalComponent } from './errormodal.component';
import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [CommonModule, IonicModule,BrowserModule],
  declarations: [ErrormodalComponent],
  exports: [ErrormodalComponent],
})
export class ErrormodalModule {}
