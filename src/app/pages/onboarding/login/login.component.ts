import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth-models';
import { AuthEffects } from 'src/app/effects/auth.effects';
import { PasswordValidator } from 'src/app/effects/password-validation';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  baseUrl: string = environment.baseUrl;
  constructor(private authEffect: AuthEffects, private router: Router) {}

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        PasswordValidator.passwordStrength(),
      ]),
    });
  }

  loginUser() {
    this.authEffect.handleUserLogin(this.loginForm.value).subscribe(
      // Route user to the user list page and display list
      (response: AuthResponse | any) => {
        this.router.navigate(['/dashboard'], {
          state: { token: response.token },
        });
      }
    );
  }
}
