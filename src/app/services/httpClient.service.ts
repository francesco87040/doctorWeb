import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})

export class httpClientService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  post(url: string, body: {}): Observable<any> {
    const authToken = this.storageService.localGet('authToken');
    console.log('post ', authToken);

    const header = new HttpHeaders({
      Authorization: authToken ?? '',
    });
    return this.http.post(url, body, { headers: header });
  }

}
