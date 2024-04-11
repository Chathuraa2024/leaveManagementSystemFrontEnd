import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LeaveServiceService} from "../../../../service/leave-service.service";
import {DataSharingServiceService} from "../../../../service/data-sharing-service.service";
import {EMPTY, Observable} from "rxjs";

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
  isdate:boolean=false;
  constructor(private leaveService : LeaveServiceService ,
              private router : Router,
              private dataSharingService:DataSharingServiceService) {
  }
  ngOnInit(){
    this.id = this.dataSharingService.getData();
    this.getLeaveRequest(this.id);
  }
  reloadPage(): void {
    window.location.reload();
  }
  getLeaveRequest(id: number){
      this.leaveService.getLeaveRequest().subscribe(
        (res)=> {
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
