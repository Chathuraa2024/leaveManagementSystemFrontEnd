import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ManagerService} from "../../../service/manager.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataSharingServiceService} from "../../../service/data-sharing-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";


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
              private snackBar: MatSnackBar) {
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
    this.employees =this.dataSharingService.getData();
    for(let employee1 of this.employees){
      if(employee1.userName === username){
        this.employee = employee1
      }
    }
  }
  submit(){
    const jsonData = JSON.stringify(this.applyForm.value);
    this.managerService.updateEmployee(jsonData, this.userName).subscribe(
      (res) => {
        this.router.navigate(['/manageEmployee']);
      },
      (error) => {
        this.openSnackBar('Error . Please try again.');
      }
    )
  }
  isGender(): void {
    if(this.employee.gender == "Female"){
      this.isMale = false;
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
