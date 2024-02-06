import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { httpClientService } from './services/httpClient.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private storageService: StorageService, private httpClient: httpClientService,
  ) { }
  isLogged: boolean = false
  user: any

  ngOnInit(): void {
    this.user = JSON.parse(this.storageService.localGet('user')!);
  }

  goToPage(pageName: string) {
    this.router.navigate(['/' + pageName])
  }
  uploadImage(event: any) {
    console.log(event);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (!!reader.result) {
        this.httpClient
          .post(
            'http://localhost:8081/sistema-di-prenotazioni/api/user/update',
            {
              id: this.user.id,
              url: reader.result
            }
          ).subscribe(
            (res) => {
              alert('immagine cambiata')
            }
          )

      }
    };

  }

  openUploadImage() {
    document.getElementById('inputPhoto')?.click()
  }
}
