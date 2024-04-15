
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ManagerService} from "../../../service/manager.service";
import {UpdateEmployeeComponent} from "../update-employee/update-employee.component";
import {Router} from "@angular/router";
import {DataSharingServiceService} from "../../../service/data-sharing-service.service";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-get-all-employee',
  templateUrl: './get-all-employee.component.html',
  styleUrl: './get-all-employee.component.scss',
})
export class GetAllEmployeeComponent implements OnInit {
  employee: any=[];
  isSearch: boolean = false;
  page: number=0;
  @Input() needRefresh: boolean=false;
  isDelete: boolean=false;
  private id?: string;
  constructor(public managerService: ManagerService ,
              private router : Router , private dataSharingService:DataSharingServiceService,
              private toastr: ToastrService) {
  }
  ngOnInit(){
    this.pagination(this.page)
    this.isDelete =false;
  }
  delete(id: string,firstName:string){
    this.id = id;
    this.dataSharingService.setData([id,firstName]);
    this.isDelete =true
  }
  updateEmployee(userName: string){
    this.dataSharingService.setData(this.managerService.employees);
    const url = `/updateEmployee/${userName}`
    this.router.navigate([url])
  }
  search(firstName: string) {
    try {
      if (firstName) {
        this.isSearch=true
        for (const emp of this.managerService.employees) {
          if (emp.firstname === firstName) {
            this.employee.push(emp)
          }else{
            this.isSearch=false
            this.pagination(this.page);
            this.toastr.warning('Please check the entered details and try again.',firstName+' Employee not found')
          }
        }
      } else {
        this.isSearch=false
        this.pagination(this.page);
      }
    }catch (error: any){
      this.toastr.error('Error finding employee', error)
    }
  }
  movePage(isNext: boolean) {
    if(isNext){
      this.page = this.page+1;
      this.pagination(this.page)
    }else {
      if(this.page > 0){
        this.page = this.page-1;
        this.pagination(this.page)
      }
    }
  }
  pagination(page: number) {
    const size = 10;
    this.managerService.getAllEmployeePagination(page, size).subscribe(
      (res) => {
        this.managerService.employees = res.data.employees;
      },
      (error) => {
        this.toastr.error('Service unavailable. Please check back later','503')
      }
    );
  }
  changeStatus($event: boolean) {
    this.isDelete = $event
  }

}


