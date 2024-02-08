import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class showError {

    constructor(
        private alertController: AlertController
    ) {
    }

    async presentAlert(title: string, message: string, buttons: any[]) {
        const alert = await this.alertController.create({
            header: title,
            message,
            buttons,
        });

        await alert.present();
    }
}
