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
  }
  public getUser(){
    this.user = this.userAuthService.getName();
  }

}
