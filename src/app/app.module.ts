import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OnboardingModule } from './pages/onboarding/onboarding.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { ErrorModule } from './pages/error/error.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminEffects } from './effects/admin.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    OnboardingModule,
    DashboardModule,
    ErrorModule,
  ],
  providers: [AdminEffects],
  bootstrap: [AppComponent],
})
export class AppModule {}
