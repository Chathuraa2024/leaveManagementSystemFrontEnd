import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LeaveServiceService} from "../../../service/leave-service.service";
import {Router} from "@angular/router";
import {UserAuthService} from "../../../service/user-auth.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

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
    employeeId: new FormControl(''),
    leaveType: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    halfType: new FormControl(''),
    description: new FormControl(''),
    duration: new FormControl(''),
  });
  Duration: any = this.applyForm.value.duration;
  constructor(
    private leaveService:LeaveServiceService,
    private router: Router,
    private userAuthService : UserAuthService,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(){
    this.getUserName();
  }


  submitApplication(){
    const jsonData = JSON.stringify(this.applyForm.value);
    this.leaveService.addLeave(jsonData).subscribe((res) => {
        if(res){
          this.openSnackBar("is Leave Add",res.data)
          const url = `/employee/${this.userName}`
          this.router.navigate([url]);
        }
      },
      (error) => {
        this.openSnackBar("leave Subbmition fial","can you try")
    })
  }
  getUserName(){
    this.userName = this.userAuthService.getName()
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,});
  }

}
