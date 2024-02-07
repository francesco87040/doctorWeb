import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserCommand } from 'src/app/command/user-command';
import { AlertService } from 'src/app/services/alertService.service';
import { httpClientService } from 'src/app/services/httpClient.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userId: string;
  user: any;
  userReservationList: any[];
  isDoctor: boolean
  updateProfileForm: FormGroup
  profilePic: any = '';


  constructor(
    private httpClient: httpClientService,
    private storageService: StorageService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,

  ) {
    this.buidForm();
  }

  buidForm() {
    this.updateProfileForm = this.formBuilder.group({
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


  ngOnInit(): void {
    this.user = JSON.parse(this.storageService.localGet('user')!);
    this.fillUserField()
    this.isDoctor = this.user.roles == 'ROLE_ADMIN'
  }

  ionViewWillEnter() {
    this.spinner.show()
    this.httpClient
      .post(
        this.isDoctor ? 'http://localhost:8081/sistema-di-prenotazioni/api/reservation/getDoctorReservation' : 'http://localhost:8081/sistema-di-prenotazioni/api/reservation/getUserReservation',
        this.isDoctor ? { idDoctor: this.user.id } : { idUser: this.user.id }
      )
      .subscribe(
        (res) => {
          this.spinner.hide()

          this.userReservationList = res.data
        },
        (error) => {
          this.spinner.hide()

          alert(error?.message ?? error);
        }
      );
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

  updateProfile() {
    this.spinner.show()
    const command = new UserCommand();
    command.name = this.updateProfileForm.controls['name'].value;
    command.surname = this.updateProfileForm.controls['surname'].value;
    command.email = this.updateProfileForm.controls['email'].value;
    command.password = this.updateProfileForm.controls['password'].value;
    command.birthDate = new Date(
      this.updateProfileForm.controls['birthDate'].value
    ).getTime();
    command.phone = this.updateProfileForm.controls['phone'].value;
    command.visitDuration =
      this.updateProfileForm.controls['visitDuration'].value;
    command.specialization =
      this.updateProfileForm.controls['specialization'].value;
    command.url = this.profilePic;
    command.roles = this.user.roles;
    command.id = this.user.id

    this.httpClient
      .post(
        'http://localhost:8081/sistema-di-prenotazioni/api/user/update',
        command
      )

      .subscribe(
        (res) => {
          this.spinner.hide()
          this.alertService.showError('Aggiornamento effettuato', 'Aggiornamento delle informazioni effettuato correttamente')
          console.log(res)
          this.storageService.localRemove('user')
          this.router.navigate(['/login'])
        },
        (error) => {
          this.spinner.hide()
          this.alertService.showError('Errore', error.message)
          console.log(error.message);
        }
      )
  }

  fillUserField() {
    this.updateProfileForm.controls['name'].setValue(this.user.name)
    this.updateProfileForm.controls['surname'].setValue(this.user.surname)
    this.updateProfileForm.controls['email'].setValue(this.user.email)
    this.updateProfileForm.controls['password'].setValue(this.user.password)
    this.updateProfileForm.controls['birthDate'].setValue(new Date(this.user.birthDate))
    this.updateProfileForm.controls['phone'].setValue(this.user.phone)
    this.updateProfileForm.controls['visitDuration'].setValue(this.user.visitDuration)
    this.updateProfileForm.controls['specialization'].setValue(this.user.specialization)
    this.updateProfileForm.controls['url'].setValue(this.user.url)
  }

}