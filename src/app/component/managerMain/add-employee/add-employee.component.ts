import {Component, OnInit, ViewChild} from '@angular/core';
import {ManagerService} from "../../../service/manager.service";
import {Router} from "@angular/router";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GetAllEmployeeComponent} from "../get-all-employee/get-all-employee.component";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent{


  applyForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    email: new FormControl('@company.com', [Validators.required, Validators.email]),
    password: new FormControl('w3l1c0m3T8', [Validators.required, Validators.minLength(8)]),
    roles: new FormControl('', Validators.required),
    workerRole: new FormControl('', Validators.required),
    workSite: new FormControl('', Validators.required),
    currentProject: new FormControl(''),
    gender: new FormControl('', Validators.required)
  });

  constructor(private managerService: ManagerService ,
              private router: Router,
              private toastr: ToastrService
  ) {
  }

  submitApplication(){
      const jsonData = JSON.stringify(this.applyForm.value);
      this.managerService.addEmployee(jsonData).subscribe((res) => {
        if(res.code == 200){
          const employee = res.data;
          this.toastr.success(res.massage,res.code)
          this.managerService.employees.push(employee);
          this.applyForm.reset({
            email: '@company.com',
            password: 'w3l1c0m3T8'
          });
        }else {
          this.toastr.error(res.massage,res.data)
        }
        },
        (error) => {
          this.toastr.error('Unable to connect to the server. Please check your network connection and try again','504') })

  }

}
