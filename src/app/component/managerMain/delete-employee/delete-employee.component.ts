import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ManagerService} from "../../../service/manager.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataSharingServiceService} from "../../../service/data-sharing-service.service";
import {AudioService} from "../../../service/audio.service";

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
              private router: Router,
              private audioService:AudioService) {
  }
  ngOnInit(){
    this.Name = this.dataSharingService.getData();
  }
  onDelete(id: string){
    this.audioService.playButton()
    this.managerService.deleteEmployee(id).subscribe(()=>{
      this.audioService.deleteEmp()
      this.isDelete.emit(false);
      this.managerService.employees = this.managerService.employees.filter((emp: any) => emp.userName !== id);
    })
  }
  cancel() {
    this.audioService.playButton()
    this.isDelete.emit(false);
  }
}
