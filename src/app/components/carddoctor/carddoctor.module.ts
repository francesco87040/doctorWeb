import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CarddoctorComponent } from './carddoctor.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule,IonicModule],
  declarations: [CarddoctorComponent],
  exports: [CarddoctorComponent],
})
export class CarddoctorModule {}
