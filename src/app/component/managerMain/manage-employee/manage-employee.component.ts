import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {DataSharingServiceService} from "../../../service/data-sharing-service.service";
import {AudioService} from "../../../service/audio.service";

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrl: './manage-employee.component.scss'
})
export class ManageEmployeeComponent {
  needRefresh: boolean = false;
  isRefresh: boolean=false;
  constructor(private router:Router,
              private audioService: AudioService) {
  }
  addOne() {
    this.router.navigate(['/addEmployee'])
  }
}
