import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class DashboardService {

  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get(`${environment.apiUrl}/auth`);
  }
}
