import { Component } from '@angular/core';
import {UserAuthService} from "../../../service/user-auth.service";
import {ManagerService} from "../../../service/manager.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeServiceService} from "../../../service/employee-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.scss'
})
export class EmployeeProfileComponent {

  employee : any;
  username : string='';
  isEdit:boolean=false;
  isChangePa: boolean = false;
  address: any;
  contactNumber: any;
  email: any;
  firstname: any;
  gender: any;
  currentProject: any;
  gitHub: any;
  lastName: any;
  pemail: any;
  skype: any;
  userName: any;
  workSite: any;
  workerRole: any;
  isValid: boolean= false;

  applyForm = new FormGroup({
    address: new FormControl(''),
    contactNumber: new FormControl('',Validators.pattern('^[0-9]+$')),
    gitHub: new FormControl('',Validators.pattern('^(https?://)?(www.)?github.com/.+$')),
    pemail:new FormControl('',Validators.email),
    skype:new FormControl(''),
    status: new FormControl(''),
    newPassword: new FormControl(''),
    conformPassword: new FormControl('',Validators.minLength(8)),
    beFroPassword: new FormControl('',Validators.minLength(8)),
  });

  ngOnInit(){
  this.getUsername();
  this.getEmployeeDetails();
  }
  constructor(private userAuthService: UserAuthService ,
              private managerService: ManagerService ,
              private employeeService: EmployeeServiceService,
              private toastr: ToastrService) {
  }

  getUsername(){
    this.username = this.userAuthService.getName();
  }

  getEmployeeDetails(){
    this.managerService.getEmployeeById(this.username).subscribe((res)=>{
      this.employee = res.data;
      this.address = this.employee.address;
      this.contactNumber = this.employee.contactNumber;
      this.email= this.employee.email;
      this.firstname = this.employee.firstname;
      this.gender = this.employee.gender;
      this.currentProject = this.employee.currentProject;
      this.gitHub = this.employee.gitHub;
      this.lastName = this.employee.lastName;
      this.pemail = this.employee.pemail;
      this.skype = this.employee.skype;
      this.userName= this.employee.userName;
      this.workSite= this.employee.workSite;
      this.workerRole= this.employee.workerRole;

    })
  }
  submit() {
    const jsonData = JSON.stringify(this.applyForm.value);
      this.employeeService.updateEmployee(jsonData,this.username).subscribe((res)=>{
        this.openSnackBar('update Successful')
    })
    }

  edit() {
    this.isEdit = !this.isEdit;
  }

  changePassword() {
    this.isChangePa= true;
    if(this.isValidPassword(this.applyForm.value.newPassword ?? '' , this.applyForm.value.conformPassword ?? '')){
      const jsonData = JSON.stringify(this.applyForm.value);
      this.employeeService.updateEmployee(jsonData,this.username).subscribe((res)=>{
        this.openSnackBar('update Successful')
      })
      this.isChangePa = false;
    }
  }

  private isValidPassword(password1: string, password:string ): boolean{
    console.log(password1)
    const minLength: number = 8;
    const hasUpperCase: RegExp = /[A-Z]/;
    const hasLowerCase: RegExp = /[a-z]/;
    const hasDigits: RegExp = /[0-9]/;
    if(password1 == null && password == null ){
      return false;
    }
    if(password1 != password){
      return false;
    }
    if (password.length < minLength) {
      return false;
    }
    if (!hasUpperCase.test(password)) {
      return false;
    }
    if (!hasLowerCase.test(password)) {
      return false;
    }
    if (!hasDigits.test(password)) {
      return false;
    }

    return true;
  }

  Back() {
    this.isEdit= false;
    this.isChangePa = false;
  }

  submitPasword() {
    if(this.isValidPassword(this.applyForm.value.newPassword ?? '' , this.applyForm.value.conformPassword ?? '') && (this.applyForm.valid)){
      const jsonData = JSON.stringify(this.applyForm.value);
      console.log(jsonData)
      this.employeeService.updateEmployee(jsonData,this.username).subscribe((res)=>{
        this.toastr.success('Password updated Successfully','Update Password')
      })
      this.isChangePa = false;
    }else {
      this.isValid=true
    }
  }

}
