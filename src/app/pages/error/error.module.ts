import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Error404Component } from './error404/error404.component';
import { ErrorRoutingModule } from './error-routing.module';

@NgModule({
  declarations: [Error404Component],
  imports: [BrowserModule, ErrorRoutingModule],
  providers: [],
})
export class ErrorModule {}
