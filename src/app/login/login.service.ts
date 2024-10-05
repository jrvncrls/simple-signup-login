import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(payload: { username: string; password: string }) {
    return this.httpClient.post(`${environment.apiUrl}/auth/login`, payload);
  }

  getUsername() {
    return this.httpClient
      .get<{ data: { username: string } }>(`${environment.apiUrl}/auth`)
      .pipe(map(response => response.data.username));
  }
}
