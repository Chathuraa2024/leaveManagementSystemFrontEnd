import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LeaveServiceService} from "../../../../service/leave-service.service";
import {DataSharingServiceService} from "../../../../service/data-sharing-service.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponentComponent} from "../../confirmation-dialog-component/confirmation-dialog-component.component"
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-leave-manage',
  templateUrl: './leave-manage.component.html',
  styleUrl: './leave-manage.component.scss'
})
export class LeaveManageComponent {
  tlLeaves: any=[];
  tdLeaves : any[] = [];
  isTrue: boolean = false;
  isSearch: boolean = true;
  id: number = 0;
  currentView: string = 'default';
  isdate:boolean=false;
  constructor(public leaveService : LeaveServiceService ,
              private router : Router,
              private dataSharingService:DataSharingServiceService,
              public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) {
  }
  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.currentView = params['view'] || 'default';
    });
    this.id = this.dataSharingService.getData();
    this.getLeaveRequest(this.id);
  }
  getLeaveRequest(id?: number | undefined){
      this.leaveService.getLeaveRequest().subscribe(
        (res)=> {
          this.leaveService.leaves=[]
          let j =0
          if(id != undefined){
            for(let i =0 ;i< res.data.length;i++){
              if(res.data[i].id === id){
                this.leaveService.leaves[0] = res.data[i];
              }
            }
          }else{
            for(let i =0 ;i< res.data.length;i++) {
              if (res.data[i].accept === "NOT_LOOK") {
                this.leaveService.leaves[j] = res.data[i];
                j = j + 1
              }}}
        },error => {
          this.toastr.error('Error finding Leave',error)
        }
      )
  }

  extractDateFromString(dateString: string): string | null {
    const regex = /^(\d{4}-\d{2}-\d{2})/;
    const match = dateString.match(regex);
    return match ? match[1] : null;
  }

  Submit(i: boolean , id: number){
      this.leaveService.putAcceptRequest(i,id).subscribe(res=>{
        const newLeave = res.data;
        for(let lev of this.leaveService.leaves){
          if(lev.id === id){
            Object.assign(lev, newLeave);
          }
        }
        this.toastr.success(res.message)
      })
  }
  confirmSubmission(accept: boolean, leaveId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '450px', height: '100px',
      data: { accept: accept, leaveId: leaveId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.Submit(accept, leaveId);
        this.getLeaveRequest(this.id);
      }
    });
  }
  getDetails(leave1: any) {
    const url = `/updateEmployee/${leave1}`
      this.router.navigate([url])
  }

  search(date : any){
    if(date){
      this.leaveService.getLeaveListToday(date).subscribe(
        (res) => {
          this.tlLeaves = res.data
          this.dataSharingService.setData(this.tlLeaves)
          if(res){
            this.tdLeaves = res.data
          }else{
            this.isSearch =false;
          }}
      )
    }else{
      this.isdate =true
    }
  }

  viewEmployee(userName: string) {
    const url = `/updateEmployee/${userName}`
    this.router.navigate([url])
  }

  Refresh() {
    this.getLeaveRequest();
  }
}
