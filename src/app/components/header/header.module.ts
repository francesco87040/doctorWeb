import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

import { HeaderComponent } from './header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],

  
})

export class HeaderModule {


}
