import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {UserAuthService} from "../../service/user-auth.service";
import {LoginServiceService} from "../../service/login-service.service";


@Injectable({
  providedIn: 'root'
})
export class authGuard implements  CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.userAuthService.getToken() !== null){
      const role = route.data["roles"] as Array<String>;
      console.log(route.data["roles"])
      if(role){
        const match = this.loginService.roleEqual(role[0])
        console.log(role[0])
        console.log(match)
        if(match){
          console.log(match)
          return true;
        }else {
          this.router.navigate(['/forbidden'])
          return false;
        }
      }
    }
    this.router.navigate(["/login"])
    return false;
  }

  constructor(private userAuthService: UserAuthService , private router: Router , private userService: UserAuthService , private loginService : LoginServiceService) {
  }


}
