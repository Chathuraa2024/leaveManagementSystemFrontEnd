import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {DataSharingServiceService} from "../../../service/data-sharing-service.service";

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrl: './manage-employee.component.scss'
})
export class ManageEmployeeComponent {
  constructor(private router:Router ) {
  }
  addOne() {
    this.router.navigate(['/addEmployee'])
  }
}
