import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { httpClientService } from 'src/app/services/httpClient.service';
import { StorageService } from 'src/app/services/storage.service';
import { showError } from 'src/app/services/showErrorService.service';


@Component({
  selector: 'app-contatti',
  templateUrl: './contatti.page.html',
  styleUrls: ['./contatti.page.scss'],
})
export class ContattiPage {
  contattiForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: httpClientService,
    private storageService: StorageService,
    private spinner: NgxSpinnerService,
    private showError: showError
  ) {
    this.contattiForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }


  onSubmit() {

    const contatti = this.contattiForm.value
    this.sendEmail(contatti.email, contatti.name, contatti.surname, contatti.message)
  }
  sendEmail(email: string, name: string, surname: string, message: string) {

    this.spinner.show()
      ;
    this.httpClient.post('http://localhost:8081/sistema-di-prenotazioni/email/send/mail', {
      email: email,
      name: name,
      surname: surname,
      message: message,
    }).subscribe((res) => {
      debugger
      this.spinner.hide()
      this.showError.presentAlert('Richiesta ivniata', 'La vostra richiesta è stata inviata correttamente', ['ok'])


    },
      (err) => {
        
        this.spinner.hide()
        this.showError.presentAlert('Errore compilazione', 'Compila tutti i campi correttamente', ['riprova'])
      }
    )
  }
}
