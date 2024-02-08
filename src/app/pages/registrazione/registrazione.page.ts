import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { httpClientService } from '../../services/httpClient.service';
import { UserCommand } from '../../command/user-command';
import { Route, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { showError } from 'src/app/services/showErrorService.service';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.page.html',
  styleUrls: ['./registrazione.page.scss'],
})
export class RegistrazionePage {
  registrationForm: FormGroup;
  isDoctor: boolean = false;
  profilePic: any = '';

  constructor(
    private httpClient: httpClientService,
    private formBuilder: FormBuilder,
    private router: Router,
    private showError:showError
  ) {
    this.buidForm();
  }

  buidForm() {
    this.registrationForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.pattern(/^(((00|\+)39)|((00|\+)39)?)\d{10}$/),
        Validators.required,
      ]),
      visitDuration: new FormControl(''),
      specialization: new FormControl(''),
      url: new FormControl('')
    });
  }

  onSubmit() {
    if (this.isDoctor === false) {
      const command = new UserCommand();
      command.name = this.registrationForm.controls['name'].value;
      command.surname = this.registrationForm.controls['surname'].value;
      command.email = this.registrationForm.controls['email'].value;
      command.password = this.registrationForm.controls['password'].value;
      command.birthDate = new Date(
        this.registrationForm.controls['birthDate'].value
      ).getTime();
      command.phone = this.registrationForm.controls['phone'].value;
      command.roles = 'ROLE_USER';
      command.url = this.profilePic;

      this.httpClient
        .post(
          'http://localhost:8081/sistema-di-prenotazioni/noauth/public/registration',
          command
        )

        .subscribe(
          (res) => {
            if (res) {
              if (res.Codice === '201 CREATED') {
                this.router.navigate(['/login']);
              }
            }
          },
          (error) => {
            this.showError.presentAlert('Utente già registrato',"Le credenziali inserite sono già presenti nei nostri sistemi, si prega di riprovare inserendone delle nuove",['Ok','Riprova'])
          }
        );
      console.log(command);
    } else {
      const command = new UserCommand();
      command.name = this.registrationForm.controls['name'].value;
      command.surname = this.registrationForm.controls['surname'].value;
      command.email = this.registrationForm.controls['email'].value;
      command.password = this.registrationForm.controls['password'].value;
      command.birthDate = new Date(
        this.registrationForm.controls['birthDate'].value
      ).getTime();
      command.phone = this.registrationForm.controls['phone'].value;
      command.visitDuration =
        this.registrationForm.controls['visitDuration'].value;
      command.specialization =
        this.registrationForm.controls['specialization'].value;
      command.url = this.profilePic;
      command.roles = 'ROLE_ADMIN';

      this.httpClient
        .post(
          'http://localhost:8081/sistema-di-prenotazioni/noauth/public/registration',
          command
        )

        .subscribe(
          (res) => {
            if (res) {
              if (res.Codice === '201 CREATED') {
                this.router.navigate(['/login']);
              } 
            }
          },
          (error) => {
            this.showError.presentAlert('Dottore già presente',"Le credenziali inserite appartengono ad un dottore già iscritto presso la nostra piattaforma, si prega di riprovare",['Ok','Riprova'])
          
          }
        );
     
    }
  }

  checkDoctor() {
    return (this.isDoctor = !this.isDoctor);
  }

  uploadImage(event: any) {
    console.log(event);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.profilePic = reader.result;
    };

  }
}
