import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LeaveServiceService} from "../../../../service/leave-service.service";
import {DataSharingServiceService} from "../../../../service/data-sharing-service.service";
import {EMPTY, Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponentComponent} from "../../confirmation-dialog-component/confirmation-dialog-component.component"
@Component({
  selector: 'app-leave-manage',
  templateUrl: './leave-manage.component.html',
  styleUrl: './leave-manage.component.scss'
})
export class LeaveManageComponent {
  leaves: any = [];
  tlLeaves: any=[];
  tdLeaves : any[] = [];
  isTrue: boolean = false;
  isSearch: boolean = true;
  id: number = 0;
  currentView: string = 'default';
  isdate:boolean=false;
  constructor(private leaveService : LeaveServiceService ,
              private router : Router,
              private dataSharingService:DataSharingServiceService,
              public dialog: MatDialog,
              private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.currentView = params['view'] || 'default'; // Check for query param
    });
    this.id = this.dataSharingService.getData();
    this.getLeaveRequest(this.id);
  }
  reloadPage(): void {
    window.location.reload();
  }
  getLeaveRequest(id: number){
      this.leaveService.getLeaveRequest().subscribe(
        (res)=> {
          console.log(res.data)
          let j =0
          if(id != undefined){
            for(let i =0 ;i< res.data.length;i++){
              if(res.data[i].id === id){
                this.leaves[0] = res.data[i];
              }
            }
          }else{
            for(let i =0 ;i< res.data.length;i++) {
              if (res.data[i].accept === "NOT_LOOK") {
                this.leaves[j] = res.data[i];
                j = j + 1
              }}}
        },error => {
          console.log(error)
        }
      )
  }

  extractDateFromString(dateString: string): string | null {
    const regex = /^(\d{4}-\d{2}-\d{2})/;
    const match = dateString.match(regex);
    return match ? match[1] : null;
  }

  Submit(i: boolean , id: number){
    if(i){
      this.leaveService.putAcceptRequest(i,id).subscribe(req=>{
      })
    }else {
      this.leaveService.putAcceptRequest(i,id).subscribe(req=> {
        this.router.navigate(["/leaveManage"])
      })
    }
  }
  confirmSubmission(accept: boolean, leaveId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '450px', position: { left:'550px' }, height: '100px',
      data: { accept: accept, leaveId: leaveId } // Optionally pass any data you need
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
}
