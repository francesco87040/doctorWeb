import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookreservationPageRoutingModule } from './bookreservation-routing.module';

import { BookreservationPage } from './bookreservation.page';
import { HeaderModule } from "../../components/header/header.module";
import { CalendarModule } from 'angular-calendar';

@NgModule({
    declarations: [BookreservationPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BookreservationPageRoutingModule,
        HeaderModule,
        CalendarModule,
        ReactiveFormsModule
    ]
})
export class BookreservationPageModule {}