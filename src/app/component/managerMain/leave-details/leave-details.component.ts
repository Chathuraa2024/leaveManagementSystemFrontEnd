import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LeaveServiceService} from "../../../service/leave-service.service";
import {combineAll} from "rxjs";


@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-details.component.html',
  styleUrl: './leave-details.component.scss'
})
export class LeaveDetailsComponent {
  userName : string = "";
  leaveBalance : any;
  totalLeaves : any;
  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.userName = params['userName'];
      console.log(this.userName);
    });
  }

  constructor(private router: Router , private activatedRoute:ActivatedRoute , private leaveService: LeaveServiceService) {
  }
  submit(){
    this.getData(this.userName)
    this.getTotal(this.userName)
  }
  getData(userName: string){
    this.leaveService.getDetailByLeaveBalance(userName).subscribe(
      (res:any) => {
        console.log(res)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  getTotal(userName: string){
    this.leaveService.getTotalLeavesByEmployee(userName).subscribe(
      (res:any) => {
        this.totalLeaves = res.data;
        console.log(this.totalLeaves);
      },error => {
        console.log(error);
      }
    )
  }


}
