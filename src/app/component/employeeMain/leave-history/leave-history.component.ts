import { Component } from '@angular/core';
import {LeaveServiceService} from "../../../service/leave-service.service";
import {UserAuthService} from "../../../service/user-auth.service";
import {DataSharingServiceService} from "../../../service/data-sharing-service.service";
import {EmployeeServiceService} from "../../../service/employee-service.service";


@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrl: './leave-history.component.scss'
})
export class LeaveHistoryComponent {
 employee: any=[]
  userName: string='';
  page: number=0;
  public leaveBalanceDetails: any ;

  ngOnInit(){
    this.getUserName();
    this.pagination(this.page)
  }
  constructor(private userAuthService: UserAuthService ,
              public leaveService: LeaveServiceService ,
              ) {
  }

  getUserName(){
    this.userName = this.userAuthService.getName();
  }

  extractDateFromString(dateString: string): string | null {
    const regex = /^(\d{4}-\d{2}-\d{2})/;
    const match = dateString.match(regex);
    return match ? match[1] : null;
  }

  pagination(page: number){
    const size = 2;
    this.leaveService.getLeaveDetailsByUsername(this.userName,page,size).subscribe((res)=>{
      console.log(res.data.getLeaveByUsername[0])
      this.leaveService.leaveEmployee = res.data.getLeaveByUsername
      console.log(this.leaveService.leaveEmployee)
      },error => {
        console.log(error)
      }
    )
  }
  movePage(isNext: boolean) {
    if(isNext){
      this.page = this.page+1;
    }else {
      if(this.page > 0){
        this.page = this.page-1;
      }
    }
  }
}
