import { Component } from '@angular/core';
import {UserAuthService} from "../../../service/user-auth.service";
import {ManagerService} from "../../../service/manager.service";
import {FormControl, FormGroup, ɵValue} from "@angular/forms";
import {EmployeeServiceService} from "../../../service/employee-service.service";

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
    contactNumber: new FormControl(''),
    gitHub: new FormControl(''),
    pemail:new FormControl(''),
    skype:new FormControl(''),
    status: new FormControl(''),
    newPassword: new FormControl(''),
    conformPassword: new FormControl(''),
    beFroPassword: new FormControl(''),
  });

  ngOnInit(){
  this.getUsername();
  this.getEmployeeDetails();
  }
  constructor(private userAuthService: UserAuthService , private managerService: ManagerService , private employeeService: EmployeeServiceService) {
  }

  getUsername(){
    this.username = this.userAuthService.getName();
    console.log(this.username)
  }

  getEmployeeDetails(){
    this.managerService.getEmployeeById(this.username).subscribe((res)=>{
      this.employee = res.data;
      console.log(this.employee)
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

    },error => console.log(error))

  }


  submit() {
    console.log(this.applyForm.value)
    const jsonData = JSON.stringify(this.applyForm.value);
      this.employeeService.updateEmployee(jsonData,this.username).subscribe((res)=>{
        console.log(res);
    })
    }

  edit() {
    this.isEdit = !this.isEdit;
  }

  changePassword() {
    this.isChangePa= true;
    if(this.isValidPassword(this.applyForm.value.newPassword ?? '' , this.applyForm.value.conformPassword ?? '')){
      console.log(this.applyForm.value)
      const jsonData = JSON.stringify(this.applyForm.value);
      this.employeeService.updateEmployee(jsonData,this.username).subscribe((res)=>{
        console.log(res);

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
      console.log(password)
      return false;
    }
    if (password.length < minLength) {
      return false;
    }
    // Check for uppercase letter
    if (!hasUpperCase.test(password)) {
      return false;
    }
    // Check for lowercase letter
    if (!hasLowerCase.test(password)) {
      return false;
    }
    // Check for digits
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
    if(this.isValidPassword(this.applyForm.value.newPassword ?? '' , this.applyForm.value.conformPassword ?? '')){
      console.log(this.applyForm.value)
      const jsonData = JSON.stringify(this.applyForm.value);
      this.employeeService.updateEmployee(jsonData,this.username).subscribe((res)=>{
        console.log(res);

      })
      this.isChangePa = false;
    }else {
      this.isValid=true
    }
  }
}
