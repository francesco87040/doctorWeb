import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { ModalController } from '@ionic/angular';
import { ErrormodalComponent } from '../components/errormodal/errormodal.component';

@Injectable({
    providedIn: 'root',
})
//httpclient
export class AlertService {

    constructor(
        private modalCtrl: ModalController
    ) { }

    async showError(title: string, message: string) {
        const modal = await this.modalCtrl.create({
            component: ErrormodalComponent,
            breakpoints: [0, 0.3, 0.5, 0.8],
            initialBreakpoint: 0.5,
            componentProps: { title, message },
            cssClass: 'custom-modal',
            mode: 'ios',
            animated: true
        });
        await modal.present();
    }

}
