import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AuthEffects } from 'src/app/effects/auth.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignUpComponent, LoginComponent],
  imports: [
    BrowserModule,
    OnboardingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthEffects],
})
export class OnboardingModule {}
