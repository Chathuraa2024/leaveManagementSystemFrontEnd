import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  public setRoles(roles:[]){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('roles', JSON.stringify(roles));
    }
  }

  getRoles():[]{
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(<string>localStorage.getItem('roles'));
    }
    return [];
  }

  setName(username : string){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("UserName", username);
    }
  }

  getName(): string{
    if (isPlatformBrowser(this.platformId)) {
      return <string>localStorage.getItem('UserName');
    }
    return '';
  }

  serToken(jwtToken:string){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("jwtToken", jwtToken);
    }
  }

  getToken(): string{
    if (isPlatformBrowser(this.platformId)) {
      return <string>localStorage.getItem('jwtToken');
    }
    return '';
  }

  public clear(){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

  public isLoggedIn(){
    return isPlatformBrowser(this.platformId) && this.getRoles() && this.getToken();
  }
}
