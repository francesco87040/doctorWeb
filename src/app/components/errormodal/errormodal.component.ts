import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { prenotazioneCommand } from 'src/app/command/prenotazione-command';
import { AlertService } from 'src/app/services/alertService.service';
import { httpClientService } from 'src/app/services/httpClient.service';
import { showError } from 'src/app/services/showErrorService.service';

@Component({
  selector: 'app-errormodal',
  templateUrl: './errormodal.component.html',
  styleUrls: ['./errormodal.component.scss'],

})
export class ErrormodalComponent {
  @Input() reservationId: string = ''
  updatePrenotazioneForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService, private httpClient: httpClientService, private alertService: AlertService, private showError: showError) {
    this.buidForm();
  }

  buidForm() {
    this.updatePrenotazioneForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      reservationDate: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.httpClient.post('http://localhost:8081/sistema-di-prenotazioni/api/reservation/get', { id: this.reservationId }).subscribe((res) => {
      console.log(res);
    })
  }

  // fillPrenotazioneField() {
  //   this.updatePrenotazioneForm.controls['name'].setValue(this.name)
  //   this.updatePrenotazioneForm.controls['surname'].setValue(this.user.surname)
  // }

  updatePrenotazione() {
    const reservationTimeHour = new Date(new Date(this.updatePrenotazioneForm.controls['time'].value).getTime()).getHours();
    const reservationTimeMinute = new Date(new Date(this.updatePrenotazioneForm.controls['time'].value).getTime()).getMinutes();
    const reservationDate = new Date(this.updatePrenotazioneForm.controls['reservationDate'].value).setHours(reservationTimeHour, reservationTimeMinute)
    this.spinner.show()
    const command = new prenotazioneCommand();
    command.id = this.reservationId
    command.name = this.updatePrenotazioneForm.controls['name'].value,
      command.surname = this.updatePrenotazioneForm.controls['surname'].value,
      command.reservationDate = new Date(reservationDate)

    this.httpClient
      .post(
        'http://localhost:8081/sistema-di-prenotazioni/api/reservation/update',
        command
      )

      .subscribe(
        (res) => {
          if (res.code == 'KO') {
            this.spinner.hide()
            this.showError.presentAlert('Aggiornamento fallito', "L'agggiornamento della tua prenotazione non è stato effettuato", ['rirpova',])

          } else {
            this.spinner.hide()
            this.showError.presentAlert('Aggiornamento effettuato', "L'agggiornamento della tua prenotazione è stato effettuato correttamente", ['ok'])


          }
          console.log(res);
        }
      )
  }

}
