import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
  })

export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  user: any;
  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(this.storageService.localGet('user')!);
  }

  logout() {
    this.storageService.localRemove('user');
    this.router.navigate(['/login'])
  }
  redirectToPage(page:string){
    this.router.navigate(['/'+page])
  }
}
