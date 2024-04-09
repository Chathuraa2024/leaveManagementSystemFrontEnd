import { Component } from '@angular/core';
import {ManagerService} from "../../../service/manager.service";
import {Router} from "@angular/router";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent {

  applyForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    firstname: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('@company.com', [Validators.required, Validators.email]),
    password: new FormControl('w3l1c0m3T8', [Validators.required, Validators.minLength(8)]),
    roles: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    workerRole: new FormControl('', Validators.required),
    workSite: new FormControl('', Validators.required),
    currentProject: new FormControl(''),
    gender: new FormControl('', Validators.required)
  });

    constructor(private managerService: ManagerService , private router: Router,private _snackBar: MatSnackBar ) {
    }

  submitApplication(){
    if (this.applyForm.valid) {
      const jsonData = JSON.stringify(this.applyForm.value);
      console.log(jsonData)
      this.managerService.addEmployee(jsonData).subscribe((res) => {
          console.log(res);
          this.router.navigate(['/manageEmployee']);
        },
        (error) => {
          console.error(error) })
    }else{
      this.openSnackBar('Invalid user name or Password','Try again')
      this.applyForm.markAllAsTouched();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
