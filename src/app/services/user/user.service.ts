import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  UpdateUserProfile,
  UpdateUserProfileResponse,
  UserListResponse,
  UserProfileResponse,
} from 'src/app/models/user-models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  constructor(private httpClient: HttpClient) {}

  getUserList(pageNumber: number): Observable<UserListResponse | any> {
    return this.httpClient.get(
      `${environment.baseUrl}api/users?page=${pageNumber}`,
      this.httpOptions
    );
  }
  getUser(userId: number): Observable<UserProfileResponse | any> {
    return this.httpClient.get(
      `${environment.baseUrl}api/users/${userId}`,
      this.httpOptions
    );
  }

  updateUserProfile(
    userId: number,
    records: UpdateUserProfile
  ): Observable<UpdateUserProfileResponse | any> {
    return this.httpClient.put(
      `${environment.baseUrl}api/users/${userId}`,
      { records },
      this.httpOptions
    );
  }

  removeUserProfileFromList(userId: number): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}api/users/${userId}`,
      this.httpOptions
    );
  }
}
