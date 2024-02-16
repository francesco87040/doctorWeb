import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserCommand } from 'src/app/command/user-command';
import { httpClientService } from 'src/app/services/httpClient.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  doctorList: UserCommand[];
  user:any

  constructor(
    private httpClient: httpClientService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public menuCtrl: MenuController,
    private storageService:StorageService
   
  ) { }
  ionViewWillEnter() {
    this.user = JSON.parse(this.storageService.localGet('user')!);
   if(this.user){
    this.spinner.show()
     this.httpClient
     .post(
       'http://localhost:8081/sistema-di-prenotazioni/api/user/getuseradmin',
       { roles: 'ROLE_ADMIN' }
     )
     .subscribe(
       (success) => {
         this.spinner.hide()

         this.doctorList = success;
         console.log(success);
       },
       (error) => {
         this.spinner.hide()

         console.log(error);
         console.log('error');
       }
     );
   }

    this.menuCtrl.enable(true);
  }
  ngOnInit() {
 
   
  }

  buttonReservation(doctorId: string) {
    this.router.navigate(['/bookreservation'], { queryParams: { doctorId } });
  }
}
