import {Component, Input} from '@angular/core';
import {LeaveServiceService} from "../../../service/leave-service.service";
import {UserAuthService} from "../../../service/user-auth.service";
import {ChartData} from "chart.js";
import {DataSharingServiceService} from "../../../service/data-sharing-service.service";

@Component({
  selector: 'app-leave-balance-for-employee',
  templateUrl: './leave-balance-for-employee.component.html',
  styleUrl: './leave-balance-for-employee.component.scss'
})
export class LeaveBalanceForEmployeeComponent {
  //
  leaveBalanceDetails: any;
  userName: string = '';
  totalLeave: any = 0;
  @Input() dashBord: boolean = false;
  ngOnInit() {
    this.getUsername();
    this.getLeaveBalanceDetails(this.userName);
    this.getTotalLeave(this.userName);
    console.log(this.dashBord)
  }

  constructor(private leaveService: LeaveServiceService, private userAuthService: UserAuthService) {
  }

  getUsername() {
    this.userName = this.userAuthService.getName()
  }

  getLeaveBalanceDetails(userName: string) {
    this.leaveService.getDetailByLeaveBalance(userName).subscribe(
      (res: any) => {
        this.leaveBalanceDetails = res.data;
        console.log(this.leaveBalanceDetails)
      })
  }

  getTotalLeave(userName: string) {
    this.leaveService.getTotalLeavesByEmployee(userName).subscribe(
      (res: any) => {
        this.totalLeave = res.data;
        console.log(this.totalLeave)
      }, error => {
        console.log(error);
      }
    )
  }

















}


