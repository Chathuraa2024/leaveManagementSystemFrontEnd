import {Component, SimpleChanges} from '@angular/core';
import {LeaveServiceService} from "../../../service/leave-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  userName: string = '';
  isShow: boolean = false;
  duration: any = "ACCEPT";
  totalLeave: any = 0;
  leaveBalanceDetails: any ;
  isRes: boolean = false;
  startDay = new Date();
  year = this.startDay.getFullYear();
  month = this.startDay.getMonth() + 1; // getMonth() returns 0-11
  day = this.startDay.getDate();
  dashBord: boolean=true;
  formattedDate = `${this.year}-${this.month.toString().padStart(2, '0')}-${this.day.toString().padStart(2, '0')}`;
  currentEmployeeId: number=0;


  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.userName = params['userName'];
    });
    this.getLeaveDetails();
  }
  constructor(public leaveService : LeaveServiceService,
              private activatedRoute : ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {
  }

  setCurrentEmployeeId(id: number) {
    this.currentEmployeeId = id;
  }

  clearCurrentEmployeeId() {
    this.currentEmployeeId = 0;
  }
  getLeaveDetails(){
    this.leaveService.leaveEmployee =[];
    this.leaveService.getAllLeaveByUserName(this.userName).subscribe((res)=>{
      if(!res || !res.data || !Array.isArray(res.data) || res.data.length === 0){
        this.isRes = false;
      }else{
        this.isRes = true;
        let j =0;
        for(let i =0 ; i<= res.data.length;i++) {
          const startDateString = res.data[i].startDate;
          const startDate = new Date(startDateString);
          if (!this.isWithinRange(startDate, this.startDay, 45)) {
            continue;
          }
          this.leaveService.leaveEmployee[j] = res.data[i];
          j=j+1;
        }
      }
    })
  }
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
  descript(){
     this.isShow = true;
  }
  edit(id: number) {
    const url = `editLeave/${id}`
    this.router.navigate([url])
  }
  remove(id : number) {
    this.leaveService.deleteLeaveRequest(id).subscribe(req=>{
      this.toastr.success('Your Leave Request has been successfully deleted',"Leave Request Successfully Deleted")
      this.leaveService.leaveEmployee = this.leaveService.leaveEmployee.filter((emp: any) => emp.id !== id);
    })
  }
}




