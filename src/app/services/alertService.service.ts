import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { ModalController } from '@ionic/angular';
import { ErrormodalComponent } from '../components/prenotazionimodal/prenotazionmodal.component';

@Injectable({
    providedIn: 'root',
})
//httpclient
export class AlertService {

    constructor(
        private modalCtrl: ModalController
    ) { }

    async showModal(reservationId: string | number) {
        const modal = await this.modalCtrl.create({
            component: ErrormodalComponent,
            breakpoints: [0, 0.3, 0.5, 0.8],
            initialBreakpoint: 0.8,
            componentProps: { reservationId },
            cssClass: 'custom-modal',
            mode: 'ios',
            animated: true
        });
        await modal.present();
    }

}