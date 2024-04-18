import {Component, ElementRef, ViewChild, AfterViewInit, Input, SimpleChanges, OnChanges} from '@angular/core';
import {Chart} from 'chart.js/auto'
import {Observable, of} from "rxjs";
import {DataSharingServiceService} from "../../../service/data-sharing-service.service";
import {LeaveServiceService} from "../../../service/leave-service.service";
import {UserAuthService} from "../../../service/user-auth.service";
import {AudioService} from "../../../service/audio.service";

@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.scss']
})
export class DataChartComponent {
  private leaveBalanceDetails: any;
  private userName:string=''
  private casualDays: number =0;
  private annualDays: number =0;
  private sickDays: number = 0;
  private totalDay: number = 0;
  @Input() dashBord:boolean=false;


  @ViewChild('myChart',{ static: false }) myChartCanvas?: ElementRef;
  @ViewChild('totalLeave',{ static: false }) totalLeaveCanvas?: ElementRef;
  constructor(private userAuthService:UserAuthService ,private leaveService: LeaveServiceService,
              private audioService:AudioService) {
  }
  ngAfterViewInit() {
    this.getUserName();
    this.getLeaveBalanceDetails(this.userName);
  }

  barChart() {
    if (!this.myChartCanvas) return;
    const ctx = this.myChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Casual', 'Sick', 'Annual'],
        datasets: [{
          label: 'Days',
          data: [this.casualDays, this.sickDays, this.annualDays],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
  doughnutChart() {
    if (!this.totalLeaveCanvas) return; // Check if canvas is available
    const ctx = this.totalLeaveCanvas.nativeElement.getContext('2d');
    if (!ctx) return; // Check if context is available
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['use leave', 'remaining'],
        datasets: [{
          label: 'Total Leave Balance',
          data: [this.totalDay, 28 - this.totalDay],
          backgroundColor: [
            'rgb(199,33,67)',
            'rgb(48,163,239)'
          ]
        }]
      }
    });
  }
  getLeaveBalanceDetails(userName: string) {
    this.leaveService.getDetailByLeaveBalance(userName).subscribe(
      (res: any) => {
        this.leaveBalanceDetails = res.data;
        this.sickDays =  res.data.sickDays;
        this.annualDays = res.data.annualDays;
        this.casualDays = res.data.casualDays;
        this.totalDay = res.data.fullDays + res.data.halfDays/2
        this.barChart();
        this.doughnutChart()
      })
  }
  getUserName(){
    this.userName = this.userAuthService.getName()
  }


}
