import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserAuthService} from "../../service/user-auth.service";
import {LoginServiceService} from "../../service/login-service.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  sidebarVisible: boolean = true;
  public clicked1 = false
  public clicked2 = false
  public clicked3 = false
  public clicked4 = false
  public userName : string='';
  constructor(private router:Router ,public loginService : LoginServiceService, private userAuthService: UserAuthService) {
        }
  ngOnInit() {
    this.userName=this.userAuthService.getName()
    console.log("user name "+ this.userName )
  }

  public onClick1(){
      if(this.loginService.roleEqual('EMPLOYEE')){
        const url = `/employee/${this.userName}`
        this.router.navigate([url])
      }else{
        const url = `/manager/${this.userName}`
        this.router.navigate([url])
      }
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
