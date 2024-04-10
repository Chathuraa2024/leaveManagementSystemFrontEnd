import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {LoginServiceService} from "../../service/login-service.service";
import {UserAuthService} from "../../service/user-auth.service";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  userName: string = '' ;
  password: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private loginService:LoginServiceService, private userAuthService: UserAuthService ,
              private router: Router, private _snackBar: MatSnackBar  ) {
  }

  login(loginForm: NgForm){
    this.userName=loginForm.value.username;
    let isOpen : boolean = false;
    this.loginService.login(loginForm.value)
      .subscribe(
        (response)=>{
          this.userAuthService.serToken(response.jwtToken)
          this.userAuthService.setRoles(response.user.roles)
          this.userAuthService.setName(response.user.userName)
          const role = response.user.roles[0].roleDescription
          if(role === 'MANAGER'){
            isOpen = true;
            const url = `/manager/${loginForm.value.username}`
            this.router.navigate([url])
          }else{
            isOpen = false;
            console.log("employeee loging")
            const url = `/employee/${loginForm.value.username}`
            this.router.navigate([url])
          }
        },
        error => {
          this.openSnackBar('Invalid user name or Password',error)
        })
    return isOpen;
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,});
  }
}
