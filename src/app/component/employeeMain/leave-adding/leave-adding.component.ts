import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LeaveServiceService} from "../../../service/leave-service.service";
import {Router} from "@angular/router";
import {UserAuthService} from "../../../service/user-auth.service";
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-leave-adding',
  templateUrl: './leave-adding.component.html',
  styleUrl: './leave-adding.component.scss'
})
export class LeaveAddingComponent {

  userName : string='';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  applyForm = new FormGroup({
    employeeId: new FormControl(),
    leaveType: new FormControl('',[Validators.required]),
    startDate: new FormControl('',[Validators.required]),
    endDate: new FormControl('',),
    halfType: new FormControl('',[Validators.required]),
    description: new FormControl(''),
    duration: new FormControl('',[Validators.required]),
  });
  Duration: any = this.applyForm.value.duration;
  constructor(
    private leaveService:LeaveServiceService,
    private router: Router,
    private userAuthService : UserAuthService,
    private toastr: ToastrService) {
  }

  ngOnInit(){
    this.getUserName();
  }


  submitApplication(){
    this.applyForm.patchValue({employeeId: this.userName});
    const jsonData = JSON.stringify(this.applyForm.value);
    console.log(jsonData)
    this.leaveService.addLeave(jsonData).subscribe((res) => {
        if(res.code == 200){
          const leave = res.data;
          this.leaveService.leaveEmployee.push(leave)
          this.toastr.success(res.massage,res.code)
        }else{
          this.toastr.warning(res.massage,res.data)
        }
      },
      (error) => {
      this.toastr.error('leave Submition fial', )
    })
  }
  getUserName(){
    this.userName = this.userAuthService.getName()
  }

}
