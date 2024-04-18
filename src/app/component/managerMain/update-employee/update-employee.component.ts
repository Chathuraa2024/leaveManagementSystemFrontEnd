import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ManagerService} from "../../../service/manager.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataSharingServiceService} from "../../../service/data-sharing-service.service";
import {ToastrService} from "ngx-toastr";
import {AudioService} from "../../../service/audio.service";
import * as emailjs from "emailjs-com";


@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.scss'
})
export class UpdateEmployeeComponent {

  userName: string = "";
  employees: any=[];
  employee: any;
  applyForm: FormGroup = new FormGroup({});
  isMale: boolean= true ;

  initializeForm(): void {
    this.applyForm = new FormGroup({
      workSite: new FormControl(this.employee ? this.employee.workSite : 'Not now work site'),
      workerRole: new FormControl(this.employee ? this.employee.workerRole : 'Not now worker role'),
      currentProject: new FormControl(this.employee ? this.employee.currentProject : 'Not now current project'),
      password: new FormControl({value: 'w3l1c0m3T8', disabled: true}),
      status: new FormControl('true')
    });
  }
  constructor(private managerService : ManagerService ,
              private router: Router ,
              private activatedRoute:ActivatedRoute ,
              private dataSharingService:DataSharingServiceService,
              private toastr: ToastrService,
              private audioService: AudioService,) {
  }
  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.userName = params['userName'];
    });
    document.body.classList.add('dim-background');
    this.setEmployeeId(this.userName)
    this.initializeForm();
  }
  setEmployeeId(username:string){
    this.managerService.getAllEmployee().subscribe((res)=>{
      this.employees=res.data;
      for(let employee1 of this.employees){
        if(employee1.userName === username){
          this.employee = employee1}}
      this.isGender();
    });
  }
  submit(){
    this.audioService.playButton()
    const jsonData = JSON.stringify(this.applyForm.value);
    this.managerService.updateEmployee(jsonData, this.userName).subscribe(
      (res:any) => {
        const newEmp = res.data;
        for(let emp of this.managerService.employees){
          if(emp.userName === this.userName){
            Object.assign(emp, newEmp);
          }
        }
        this.sendEmail(res.data.username , res.data.firstname);
        this.toastr.success('Success to update employee','Update '+this.userName)
        this.router.navigate(['/manageEmployee']);
        this.dataSharingService.setData(true)
      },
      (error) => {
        this.toastr.error('Please try again',error)
      })
  }
  isGender(): void {
    if(this.employee.gender == "Female"){
      this.isMale = false;
    }
  }
  goBack() {
    this.router.navigate(['/manageEmployee'])
  }

  public sendEmail(userName:string, firstName:string) {

    const templateParams = {
      to_name: firstName,
      to_email: 'chathura13906@gmail.com',
      message: 'Hi , change your details. your username is '+userName+' and password is '+this.applyForm.value.password+' go to website and logging'
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
