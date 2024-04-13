import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ManagerService} from "../../../service/manager.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataSharingServiceService} from "../../../service/data-sharing-service.service";

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.scss'
})
export class DeleteEmployeeComponent {
  public Name?: any=[];
  @Output() isDelete = new EventEmitter<boolean>()
  constructor(private managerService: ManagerService,
              private activatedRoute:ActivatedRoute ,
              private dataSharingService:DataSharingServiceService,
              private router: Router) {
  }
  ngOnInit(){
    this.Name = this.dataSharingService.getData();

  }
  onDelete(id: string){
    this.managerService.deleteEmployee(id).subscribe(()=>{
      this.managerService.triggerEmployeeDelete();
      this.isDelete.emit(false);
    })
  }
  cancel() {
    this.isDelete.emit(false);
  }
}
