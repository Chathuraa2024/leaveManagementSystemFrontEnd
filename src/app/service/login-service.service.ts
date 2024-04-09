import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserAuthService} from "./user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  BASE_URL = "http://localhost:8080/api/v1";
  userName: string='';
  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );
  constructor(private httpClient: HttpClient ,
  private  userAuthService: UserAuthService) {
  }
  public login(loginData: any) : Observable<any>{
    const url = `${this.BASE_URL}/employee-manage/login`;
    return this.httpClient.post(url, loginData,{headers:this.requestHeader})
  }
  //@ts-ignore
  public  roleEqual(allowRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();
    if (userRoles != null && userRoles) {
        if (allowRoles === userRoles[0].roleDescription) {
          isMatch = true;
          return isMatch;
        } else {
          return isMatch;
        }
    }
  }
  public UserName(userName: string){
    this.userName = userName;
    return this.userName;
  }
}
