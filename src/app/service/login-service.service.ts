import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserAuthService} from "./user-auth.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  BASE_URL = environment.apiUrl+"/v1";
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
    if (userRoles != null && userRoles.length > 0) {
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
