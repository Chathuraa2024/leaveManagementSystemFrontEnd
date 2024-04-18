import {Component, Input} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserAuthService} from "../../../service/user-auth.service";
import {LeaveServiceService} from "../../../service/leave-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AudioService} from "../../../service/audio.service";

@Component({
  selector: 'app-edit-employee-leave',
  templateUrl: './edit-employee-leave.component.html',
  styleUrl: './edit-employee-leave.component.scss'
})
export class EditEmployeeLeaveComponent {
  Duration: any;
  @Input() id!: number;
  leaveDetails : any = "";
  leaveType: any;
  startDate: any;
  endDate:any;
  halfType: any;
  description: any;
  applyForm = new FormGroup({
    leaveType: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    halfType: new FormControl(''),
    description: new FormControl(''),
    duration: new FormControl(''),
  });

  ngOnInit(){
    this.getLeaveById(this.id);
  }

  constructor( private activatedRoute: ActivatedRoute ,
               private leaveService: LeaveServiceService,
               private router: Router,
               private toastr: ToastrService,
               private audioService: AudioService) {
  }


  getLeaveById(id: number){
    this.leaveService.getALeaveDetails(id).subscribe((res)=>{
      this.leaveDetails = res.data
      this.leaveType = this.leaveDetails.leaveType;
      this.startDate= this.extractDateFromString(this.leaveDetails.startDate);
      this.endDate = this.extractDateFromString(this.leaveDetails.endDate);
      this.halfType = this.leaveDetails.halfType;
      this.description = this.leaveDetails.description;
      this.Duration  = this.leaveDetails.duration;
    })
  }

  extractDateFromString(dateString: string): string | null {
    const regex = /^(\d{4}-\d{2}-\d{2})/;
    const match = dateString.match(regex);
    return match ? match[1] : null;
  }
  submitApplication() {
    this.audioService.playButton()
    const jsonData = JSON.stringify(this.applyForm.value);
    this.leaveService.editLeave(jsonData, this.id).subscribe((res) => {
        const newEmp = res.data;
        for(let emp of this.leaveService.leaveEmployee){
          if(emp.id === this.id){
            Object.assign(emp, newEmp);
          }
        }
        this.audioService.playSuccess()
        this.toastr.success(res.massage,"Leave Edit")
      },
      (error) => {
        this.audioService.playWrong()
        this.toastr.error('Failed to edit leave due to internal error','500') })
  }

}
