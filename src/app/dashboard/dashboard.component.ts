import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService],
})
export class DashboardComponent implements OnInit {
  username$!: Observable<string>;

  constructor(private selfService: DashboardService, private router: Router) {}

  ngOnInit(): void {
    this.username$ = this.selfService.getUsername();
  }

  onLogoutClick() {
    this.selfService
      .logout()
      .pipe(take(1))
      .subscribe(res => {
        alert(res);
        this.router.navigate(['login']);
      });
  }
}
