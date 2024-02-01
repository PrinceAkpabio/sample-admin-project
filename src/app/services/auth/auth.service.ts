import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse, LoginCredentials } from 'src/app/models/auth-models';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  constructor(private httpClient: HttpClient) {}

  login(credentials: LoginCredentials): Observable<AuthResponse | any> {
    return this.httpClient.post(
      `${environment.baseUrl}api/login`,
      credentials,
      this.httpOptions
    );
  }
  register(credentials: LoginCredentials): Observable<AuthResponse | any> {
    return this.httpClient.post(
      `${environment.baseUrl}api/register`,
      credentials,
      this.httpOptions
    );
  }
}
