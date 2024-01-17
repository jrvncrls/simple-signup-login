import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(payload: { username: string; password: string }) {
    return this.httpClient.post(`${environment.apiUrl}/login`, payload);
  }
}
