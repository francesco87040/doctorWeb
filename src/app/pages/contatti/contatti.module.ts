import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContattiPageRoutingModule } from './contatti-routing.module';

import { ContattiPage } from './contatti.page';
import { HeaderModule } from "../../components/header/header.module";

@NgModule({
    declarations: [ContattiPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ContattiPageRoutingModule,
        HeaderModule,
        ReactiveFormsModule
    ]
})
export class ContattiPageModule {}
