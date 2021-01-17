import { Injectable } from '@angular/core';
import { Router, CanActivate,CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {UserService } from '../shared/services/user.service';
@Injectable()
export class AuthGuard implements CanActivate,CanActivateChild {

    constructor(private router: Router, private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        //   const expectedRole = route.data.expectedRole;
          
          if (this.userService.isAuthenticated() && sessionStorage.getItem('type') == "Admin")
           {
               return true;
           }
     
         else  if (this.userService.isAuthenticated() && sessionStorage.getItem('type') == "Customer")
           {
             
               return true;
           }
           else {
              this.router.navigate(['/']);
             
              return false;
           }
   
   
   
          
       }


       canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}
