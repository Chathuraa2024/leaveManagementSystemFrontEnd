import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {DataSharingServiceService} from "../../service/data-sharing-service.service";
import {UserAuthService} from "../../service/user-auth.service";

@Component({
  selector: 'app-forbidder',
  templateUrl: './forbidder.component.html',
  styleUrl: './forbidder.component.scss'
})
export class ForbidderComponent {
  public role : any;
  public user : string='';
  private url : any;
  constructor(private userAuthService: UserAuthService, private router: Router) {
  }
  ngOnInit(){
    this.getUser();
  }
  public getUser(){
    this.user = this.userAuthService.getName();
  }

  public goHome() {
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
