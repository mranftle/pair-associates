/**
 * Created by matthewRanftle1 on 4/11/17.
 */
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (Cookie.get('currentUser')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']); //, { queryParams: { returnUrl: state.url }});
    return false;
  }
}
