import {Component, OnInit, ViewChild} from '@angular/core';
import {ManagerService} from "../../../service/manager.service";
import {Router} from "@angular/router";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import * as emailjs from 'emailjs-com';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent{

  ngOnInit(){
    emailjs.init("6U4dkvMUpD_8JiwuT");

  }

  applyForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    email: new FormControl('@company.com', [Validators.required, Validators.email]),
    password: new FormControl('w'+Math.floor(Math.random() * 10)+'l'+Math.floor(Math.random() * 10)+'c0'+'m'+Math.floor(Math.random() * 10)+'T'+Math.floor(Math.random() * 10), [Validators.required, Validators.minLength(8)]),
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
          this.sendEmail(employee.userName , employee.firstname);
          this.applyForm.reset({
            email: '@company.com',
            password: 'w'+Math.floor(Math.random() * 10)+'l'+Math.floor(Math.random() * 20)+'c0'+'m'+Math.floor(Math.random() * 5)+'T'+Math.floor(Math.random() * 7)

          });
        }else {
          this.toastr.error(res.massage,res.data)
        }
      },
      (error) => {
        this.toastr.error('Unable to connect to the server. Please check your network connection and try again','504') })

  }
  public sendEmail(userName:string, firstName:string) {

    const templateParams = {
      to_name: firstName,
      to_email: 'chathura13906@gmail.com',
      message: 'well come our teem your username is '+userName+' and password is '+this.applyForm.value.password+' go to website and logging'
    };
    console.log(templateParams)

    emailjs.send('service_c8ab5jf', 'template_08eogy7', templateParams)
      .then((result: any) => {
        this.toastr.success('Email successfully sent!', result.text)
      }, (error: any) => {
        this.toastr.warning('Failed to send email.', error.text);
      });
  }
}
