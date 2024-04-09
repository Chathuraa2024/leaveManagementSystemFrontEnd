
import { Component} from '@angular/core';
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
  employee: any;
  isSearch: boolean = false;
  page: number=0;
  constructor(private managerService: ManagerService , private router : Router , private dataSharingService:DataSharingServiceService) {
  }
  ngOnInit(){

    this.pagination(this.page)
  }


  delete(id: string){
    this.managerService.deleteEmployee(id).subscribe(data=>{console.log(data);
      this.pagination(this.page)
    })
  }

  updateEmployee(userName: string){
    this.dataSharingService.setData(this.employees);
    console.log(userName)
    const url = `/updateEmployee/${userName}`
    this.router.navigate([url])

  }


  search(userName: string) {
    this.isSearch= true
    try {
      for( const emp of this.employees){
        if(emp.userName == userName){
          this.employee = emp
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
}


