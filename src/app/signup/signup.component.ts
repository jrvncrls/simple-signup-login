import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  providers: [SignupService],
  imports: [ReactiveFormsModule, NgIf],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private selfService: SignupService, private router: Router) {
    this.signupForm = new FormGroup({
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

  onSignUpClick(): void {
    this.selfService
      .signup({
        username: this.signupForm.get('username')?.value,
        password: this.signupForm.get('password')?.value,
      })
      .subscribe(() => {
        alert('You have sign up successfully!');
        this.router.navigate(['/login']);
      });
  }
}
