import { Component } from '@angular/core';
import {LeaveServiceService} from "../../../../service/leave-service.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {EmployeeServiceService} from "../../../../service/employee-service.service";

@Component({
  selector: 'app-manage-histry',
  templateUrl: './manage-histry.component.html',
  styleUrl: './manage-histry.component.scss'
})
export class ManageHistryComponent {
  leaves: any = [];
  tdLeaves : any[] = [];
  isTrue: boolean = false;
  isSearch: boolean = true;

  applyForm = new FormGroup({
    employeeId: new FormControl('Enter User Name'),
    duration: new FormControl(''),
    startDate: new FormControl('')
  });
  constructor(private leaveService : LeaveServiceService , private router : Router ) {
  }
  ngOnInit(){
    this.getLeaveRequest();
  }
  getLeaveRequest(){
    this.leaveService.getLeaveRequest().subscribe(
      (res)=> {
        console.log(res.data)
        this.leaves = res.data;
      }
    )
  }
  extractDateFromString(dateString: string): string | null {
    const regex = /^(\d{4}-\d{2}-\d{2})/;
    const match = dateString.match(regex);
    return match ? match[1] : null;
  }

  getDetails(leave1: any) {
    const url = `/leaveDetails/${leave1}`
    this.router.navigate([url])
  }

  search() {
    let userName = this.applyForm.get('employeeId')?.value;
    const leaveType = this.applyForm.get('duration')?.value;
    const startDate = this.applyForm.get('startDate')?.value;
    console.log(userName,leaveType,startDate)
    let filteredLeaves = this.leaves; // Assuming allLeaves is your array containing all leaves

    if (userName && ( userName != "Enter User Name")) {
      console.log(userName);
      filteredLeaves = filteredLeaves.filter((leave: any) => leave.employeeId === userName);
      if(filteredLeaves.size=0){
        filteredLeaves = this.leaves;
      }
    }
    if (leaveType && (leaveType != "Select Leave Type") ) {
      filteredLeaves = filteredLeaves.filter((leave: any) => leave.leaveType === leaveType);
      if(filteredLeaves.size=0){
        filteredLeaves = this.leaves;
      }
    }
    if (startDate) {
      filteredLeaves = filteredLeaves.filter((leave: any) => new Date(leave.startDate).getTime() === new Date(startDate).getTime());
      if(filteredLeaves.size=0){
        filteredLeaves = this.leaves;
      }
    }
    console.log(filteredLeaves);
    this.leaves = filteredLeaves;
  }

  Refresh() {
    this.getLeaveRequest();
  }
}
