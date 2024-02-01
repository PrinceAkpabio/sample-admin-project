import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guard/auth/auth.guard';

const routes: Routes = [
  {
    path: 'onboarding',
    loadChildren: () =>
      import('./pages/onboarding/onboarding-routing.module').then(
        (m) => m.OnboardingRoutingModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard-routing.module').then(
        (m) => m.DashboardRoutingModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./pages/error/error-routing.module').then(
        (m) => m.ErrorRoutingModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'onboarding',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
