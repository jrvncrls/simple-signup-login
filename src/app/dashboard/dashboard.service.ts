import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class DashboardService {
  constructor(private httpClient: HttpClient) {}

  getUsername() {
    return this.httpClient
      .get<{ data: { username: string } }>(`${environment.apiUrl}/auth`)
      .pipe(map(response => response.data.username));
  }

  logout() {
    return this.httpClient
      .put<{ message: string }>(`${environment.apiUrl}/auth/logout`, null)
      .pipe(map(response => response.message));
  }
}
