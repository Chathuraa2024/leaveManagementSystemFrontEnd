import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {LoginServiceService} from "../../service/login-service.service";
import {UserAuthService} from "../../service/user-auth.service";
import {Router} from "@angular/router";
import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {ToastrService} from "ngx-toastr";
import {AudioService} from "../../service/audio.service";


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
              private router: Router,
              private toastr: ToastrService,
              private audioService:AudioService) {
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

            this.toastr.success('Welcome back! '+loginForm.value.username,'Login successful!')
          }else{
            this.audioService.playSoundWelcome()
            isOpen = false;
            const url = `/employee/${loginForm.value.username}`
            this.router.navigate([url])

            this.toastr.success('Welcome back! '+loginForm.value.username,'Login successful!')
          }
        },
        error => {
          this.toastr.error(' Please check your username and password and try again.', 'Login failed!');
        })
    return isOpen;
  }

}
