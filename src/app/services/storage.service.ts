import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  localSave(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  sessionSave(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }

  localGet(key: string) {
    return localStorage.getItem(key);
  }

  sessionGet(key: string) {
    return sessionStorage.getItem(key);
  }

  sessionRemove(key: string) {
    sessionStorage.removeItem(key);
  }

  localRemove(key: string ) {
    localStorage.removeItem(key);
  }
}
