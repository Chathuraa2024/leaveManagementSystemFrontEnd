
import {Component, Input} from '@angular/core';
import {ManagerService} from "../../../service/manager.service";
import {UpdateEmployeeComponent} from "../update-employee/update-employee.component";
import {Router} from "@angular/router";
import {DataSharingServiceService} from "../../../service/data-sharing-service.service";

@Component({
  selector: 'app-get-all-employee',
  templateUrl: './get-all-employee.component.html',
  styleUrl: './get-all-employee.component.scss',
})
export class GetAllEmployeeComponent  {
  employees: any = [];
  employee: any=[];
  isSearch: boolean = false;
  page: number=0;
  @Input() needRefresh: boolean=false;
  isDelete: boolean=false;
  constructor(private managerService: ManagerService ,
              private router : Router , private dataSharingService:DataSharingServiceService) {
  }
  ngOnInit(){
    this.pagination(this.page)
    this.isDelete =false;
  }
  delete(id: string,firstName:string){
    this.dataSharingService.setData([id,firstName]);
    this.isDelete =true
  }
  updateEmployee(userName: string){
    this.dataSharingService.setData(this.employees);
    const url = `/updateEmployee/${userName}`
    this.router.navigate([url])
  }
  search(firstName: string) {
    this.isSearch= true
    try {
      for( const emp of this.employees){
        if(emp.firstname == firstName){
          this.employee.push(emp)
        }
      }
    }catch (error){
      console.error("Error finding employee:", error);
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
    const size = 2
    this.managerService.getAllEmployeePagination(page,size).subscribe(
      (res)=> {
        this.employees = res.data.employees;
        console.log(this.employees)
      }
    )
  }

  changeStatus($event: boolean) {
    this.isDelete = $event
  }
}


