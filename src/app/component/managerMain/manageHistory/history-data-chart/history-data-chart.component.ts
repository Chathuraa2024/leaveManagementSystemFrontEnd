import {Component, ElementRef, ViewChild} from '@angular/core';
import {forkJoin, Observable} from "rxjs";
import {Chart, ChartConfiguration} from "chart.js/auto";
import {DataSharingServiceService} from "../../../../service/data-sharing-service.service";
import {UserAuthService} from "../../../../service/user-auth.service";
import {LeaveServiceService} from "../../../../service/leave-service.service";
import {EmployeeServiceService} from "../../../../service/employee-service.service";
import {ManagerService} from "../../../../service/manager.service";

@Component({
  selector: 'app-history-data-chart',
  templateUrl: './history-data-chart.component.html',
  styleUrl: './history-data-chart.component.scss'
})
export class HistoryDataChartComponent {
  public employee: number =0;
  public leave: number=0
  public leaveCount: Observable<any> = new Observable();
  public date: Date = new Date();
  @ViewChild('myChart', {static: false}) myChartCanvas?: ElementRef;
  private empl:any=[];
  private JN: number=0;
  private MA: number =0;
  private FE: number =0;
  private APR: number =0;
  private JUL: number=0;
  private AUG: number=0;
  private SEP: number=0;
  private OCT: number=0;
  private NOV: number=0;
  private DEC: number=0;
  private MAY: number=0;
  private JUN: number=0;

  constructor(private userAuthService: UserAuthService,
              private leaveService: LeaveServiceService,
              private employeeService: EmployeeServiceService) {
  }

  ngAfterViewInit(){
    this.getAllEmployeeLeave()
  }

  lineChart() {
    if (!this.myChartCanvas) return;
    const ctx1 = this.myChartCanvas.nativeElement.getContext('2d');
    if (!ctx1) return;
    const monthlyData: number[] = [
      this.JN, this.FE, this.MA, this.APR, this.MAY, this.JUN, this.JUN, this.AUG, this.SEP, this.OCT, this.NOV, this.DEC
    ];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const myChart = new Chart(ctx1, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Monthly Data',
            data: monthlyData,
            borderColor: 'rgb(246,6,53)',
            tension: 0.1,
            borderWidth: 1,
            fill: false
          }
        ]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }


  getAllEmployeeLeave() {
    this.leaveService.getLeaveRequest().subscribe(
      (res) => {
        this.empl = res.data;
        for(let e of  this.empl){
          if (e.accept === "ACCEPT"){
            let month: number | null = this.extractMonthFromString(e.startDate)
            switch (month) {
              case 1:
                this.JN++;
                break;
              case 2:
                this.FE++;
                break;
              case 3:
                this.MA++;
                break;
              case 4:
                this.APR++;
                break
              case 5:
                this.MAY++;
                break;
              case 6:
                this.JUN++;
                break;
              case 7:
                this.JUL++;
                break;
              case 8:
                this.AUG++;
                break;
              case 9:
                this.SEP++;
                break;
              case 10:
                this.OCT++;
                break
              case 11:
                this.NOV++;
                break
              case 12:
                this.DEC++;
                break

            }
          }
        }
        this.lineChart()
      })
  }
  extractMonthFromString(dateString: string): number | null {
    const regex = /^(\d{4})-(\d{2})-\d{2}/;
    const match = dateString.match(regex);
    if (match) {
      const monthIndex = parseInt(match[2]);
      return monthIndex
    } else {
      return null;
    }
  }
}
