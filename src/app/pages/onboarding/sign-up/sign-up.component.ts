import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth-models';
import { AuthEffects } from 'src/app/effects/auth.effects';
import { PasswordValidator } from 'src/app/effects/password-validation';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  baseUrl: string = environment.baseUrl;
  constructor(private authEffect: AuthEffects, private router: Router) {}

  ngOnInit(): void {
    this.initializeSignUpForm();
  }

  initializeSignUpForm() {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        PasswordValidator.passwordStrength(),
      ]),
    });
  }

  registerUser() {
    this.authEffect
      .handleRegisterUser(this.signupForm.value)
      .subscribe((response: AuthResponse | any) => {
        // Toast to show user is registered successfully
        // Route user to the user list page and display list
        this.router.navigate(['/onboarding/login']);
        alert('User registered successfully');
      });
  }
}
