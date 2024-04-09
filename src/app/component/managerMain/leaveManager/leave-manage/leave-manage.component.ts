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
  constructor(private leaveService : LeaveServiceService , private router : Router, private dataSharingService:DataSharingServiceService) {
  }
  ngOnInit(){
    this.id = this.dataSharingService.getData();
    console.log(this.id)
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
            console.log(id)
            for(let i =0 ;i< res.data.length;i++){
              if(res.data[i].id === id){
                this.leaves[0] = res.data[i];
                console.log(this.leaves)
              }
            }
          }else{
            console.log("id=0")
            for(let i =0 ;i< res.data.length;i++) {
              if (res.data[i].accept === "NOT_LOOK") {
                this.leaves[j] = res.data[i];
                j = j + 1
              }
            }
          }
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
      console.log(true,id)
      this.leaveService.putAcceptRequest(i,id).subscribe(req=>{
        console.log(req.data);
      })
    }else {
      console.log(false,id)
      this.leaveService.putAcceptRequest(i,id).subscribe(req=> {
        console.log(req.data);
        this.router.navigate(["/leaveManage"])
      })
    }
  }

  getDetails(leave1: any) {
    const url = `/leaveDetails/${leave1}`
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
          }
        }
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
