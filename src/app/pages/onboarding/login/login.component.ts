import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth-models';
import { AuthEffects } from 'src/app/effects/auth.effects';
import { PasswordValidator } from 'src/app/effects/password-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
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

    this.loginForm.valueChanges.subscribe((value) => console.log(value));

    console.log('login form: ', this.loginForm);
  }

  loginUser() {
    this.authEffect.handleUserLogin(this.loginForm.value).subscribe(
      // Toast to show user is registered successfully
      // Route user to the user list page and display list
      (response: AuthResponse | any) => {
        console.log('login response: ', response);
        this.router.navigate(['/dashboard'], {
          state: { token: response.token },
        });
      }
    );
  }
}
