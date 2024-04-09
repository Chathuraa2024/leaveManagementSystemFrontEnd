import { Component } from '@angular/core';
import {LeaveServiceService} from "../../../../service/leave-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataSharingServiceService} from "../../../../service/data-sharing-service.service";
import {EMPTY, Observable} from "rxjs";
import {EmployeeServiceService} from "../../../../service/employee-service.service";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss'
})
export class ManagerComponent {
  leaveEmployees: any = [];
  userName: string = '';
  duration: any = "ACCEPT";
  totalLeave: any = 0;
  leaveBalanceDetails: any ;
  isRes: boolean = false;
  startDay = new Date();
  year = this.startDay.getFullYear();
  month = this.startDay.getMonth() + 1; // getMonth() returns 0-11
  day = this.startDay.getDate();
  formattedDate = `${this.year}-${this.month.toString().padStart(2, '0')}-${this.day.toString().padStart(2, '0')}`;
  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.userName = params['userName'];
    });
    this.getLeaveDetails();
  }
  constructor(private employeeService: EmployeeServiceService,
              private leaveService : LeaveServiceService,
              private activatedRoute : ActivatedRoute,
              private router: Router,
              private dataSharingService: DataSharingServiceService ) {
  }
  getLeaveDetails(){
    this.leaveService.getLeaveRequest().subscribe((res)=>{
      if(!res || !res.data){
        this.isRes = false;
      }else{
        let j =0;
        for(let i =0 ; i< res.data.length;i++) {
          if (!this.isWithinRange(new Date(res.data[i].startDate), this.startDay, 30)) {
            continue;
          }
          if(res.data[i].accept === "NOT_LOOK"){
            this.isRes = true;
            this.leaveEmployees[j] = res.data[i];
            j=j+1;
          }}}})}
  isWithinRange(startDate: Date, comparisonDate: Date, dayRange: number): boolean {
    const dayInMilliseconds = 24 * 60 * 60 * 1000;
    const difference = Math.abs(comparisonDate.getTime() - startDate.getTime());
    return difference <= dayRange * dayInMilliseconds;
  }
  extractDateFromString(dateString: string): string | null {
    const regex = /^(\d{4}-\d{2}-\d{2})/;
    const match = dateString.match(regex);
    return match ? match[1] : null;
  }
  goLeaveManage(id : number) {
    this.dataSharingService.setData(id);
    this.router.navigate(["/leaveManage"])
  }
}
