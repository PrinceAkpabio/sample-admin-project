import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UsersListComponent } from './users-list/users-list.component';
import { UserComponent } from './user/user.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserEffects } from 'src/app/effects/user.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersListComponent, UserComponent],
  imports: [
    BrowserModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UserEffects],
})
export class DashboardModule {}
