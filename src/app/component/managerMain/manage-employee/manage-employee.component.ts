import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {DataSharingServiceService} from "../../../service/data-sharing-service.service";

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrl: './manage-employee.component.scss'
})
export class ManageEmployeeComponent {
  needRefresh: boolean = false;
  isRefresh: boolean=false;
  constructor(private router:Router,
              private dataSharingService: DataSharingServiceService) {
  }
  ngOnInit(){
    this.isRefresh = this.dataSharingService.getData()
    this.refreshHtml()
  }
  addOne() {
    this.router.navigate(['/addEmployee'])
  }

  refreshHtml() {
    if(this.isRefresh){
      console.log(this.needRefresh)
      this.needRefresh = true;
      setTimeout(() => {
        this.needRefresh = false;
      });
    }
  }
}
