import { Component } from '@angular/core';
import {UserAuthService} from "../../service/user-auth.service";
import {LoginServiceService} from "../../service/login-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hader',
  templateUrl: './hader.component.html',
  styleUrl: './hader.component.scss'
})
export class HaderComponent {

  constructor(private userAuthService: UserAuthService , public loginService:LoginServiceService , private router: Router) {
  }

  public isLogin(){
    return this.userAuthService.isLoggedIn()

  }
  public clean(){
    this.userAuthService.clear()
    this.router.navigate(['/login'])
  }
  addOne(){
    this.router.navigate(["/addEmployee"])
  }


}
