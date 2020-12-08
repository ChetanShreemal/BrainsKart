import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../../users/services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userService:UserService,
              private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let token = this.userService.getToken();
    let isAdmin = this.userService.isAdminUser();
    if(token.length > 0 && isAdmin){
      return true;
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/users/login']);
    return false;
  }

}
