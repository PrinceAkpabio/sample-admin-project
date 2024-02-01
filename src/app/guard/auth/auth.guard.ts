import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/models/user-models';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const activeUser: UserProfile | null =
      localStorage.getItem('activeUser') == null
        ? null
        : JSON.parse(localStorage.getItem('activeUser') as string);
    const isLoggedIn: boolean = JSON.parse(
      localStorage.getItem('loggedIn') as string
    );
    // Check if the active user has a token and is logged in
    if (activeUser?.token && isLoggedIn) {
      return true;
    }

    this.router.navigate(['/onboarding/login']);
    alert('You are not logged in');
    return false;
  }
}
