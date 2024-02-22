import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedUser: boolean = false;

  constructor(private storageService: StorageService) {
    this.isLoggedUser = JSON.parse(this.storageService.localGet('user')!);
  }

  isAuthenticated() {
    return this.isLoggedUser;
  }
}

