import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, take, throwError } from 'rxjs';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  providers: [LoginService],
  imports: [ReactiveFormsModule, NgIf],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private selfService: LoginService) {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {}

  onLoginClick(): void {
    this.selfService.login({
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    }).pipe(
      catchError((err) => {
        alert(err.error.message)
        return throwError(() => new Error(err.error.message));
      }),
      take(1)
    ).subscribe()
  }
}
