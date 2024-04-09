import { Component } from '@angular/core';
import {UserAuthService} from "./service/user-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demoProjectFrontEnd';
  public role : any;
  public user : string='';
  private url : any;
  invertebrates: any;
  constructor(private userAuthService: UserAuthService, private router: Router) {
  }
  ngOnInit(){
    this.getUser();
    this.getRole();
  }
  public getUser(){
    this.user = this.userAuthService.getName();
  }
  public getRole() {
    this.role = this.userAuthService.getRoles();
    if (this.role && this.role.length > 0) { // Check if role is defined and not empty
      if (this.role[0].roleDescription === "MANAGER") {
        this.url = `/manager/${this.user}`;
        console.log(this.url);
        this.router.navigate([this.url]);
      } else {
        this.url = `/employee/${this.user}`;
        this.router.navigate([this.url]);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
