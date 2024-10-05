import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class SignupService {
  constructor(private httpClient: HttpClient) {}

  signup(payload: { username: string; password: string }) {
    return this.httpClient.post(`${environment.apiUrl}/auth/register`, payload)
  }
}
