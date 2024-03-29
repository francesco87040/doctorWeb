import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserCommand } from '../../command/user-command';
import { httpClientService } from 'src/app/services/httpClient.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { showError } from 'src/app/services/showErrorService.service';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  loginForm: FormGroup;
  isChecked: boolean;


  constructor(
    private formBuilder: FormBuilder,
    private httpClient: httpClientService,
    private storageService: StorageService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private showError: showError,
    public menuCtrl: MenuController

  ) {
    const savedEmail = storageService.localGet("rememberEmail")
    this.buildForm(savedEmail ?? '');
  }
  
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  buildForm(savedEmail?: string) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(savedEmail, [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.spinner.show()
    if (this.loginForm.invalid) {
      return;
    }
    const loginCommand = new UserCommand();
    loginCommand.email = this.loginForm.controls['username'].value;
    loginCommand.password = this.loginForm.controls['password'].value;

    if (this.isChecked) {
      this.storageService.localSave("rememberEmail", loginCommand.email)
    } else {
      this.storageService.localRemove("rememberEmail")
    }

    this.httpClient
      .post(
        'http://localhost:8081/sistema-di-prenotazioni/noauth/public/login',
        loginCommand
      )
      .subscribe(
        (res) => {
          this.spinner.hide()
          console.log(res)
          this.storageService.localSave('authToken', res.token);
          this.storageService.localSave('user', JSON.stringify(res))
          this.router.navigate(['/home'])
        },
        (error) => {
          this.spinner.hide()
          this.showError.presentAlert('Credenziali inserite errate', 'La password o email inserita da voi non corrispondono a quelle inserite durante la registrazione,si prega di riprovare.', ['Ok', 'Riprova'])
        }
      );
  }

  goToRegistrazione() {
    this.router.navigate(["/registrazione"])
  }

  changeValue() {
    this.isChecked = !this.isChecked
    console.log(this.isChecked);
  }

}  
