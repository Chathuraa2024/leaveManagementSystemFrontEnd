import {Component, ElementRef, ViewChild} from '@angular/core';
import {Chart} from "chart.js/auto";
import {UserAuthService} from "../../../../service/user-auth.service";
import {LeaveServiceService} from "../../../../service/leave-service.service";
import {EmployeeServiceService} from "../../../../service/employee-service.service";
import {forkJoin} from "rxjs";
import {DataSharingServiceService} from "../../../../service/data-sharing-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manager-data-chart',
  templateUrl: './manager-data-chart.component.html',
  styleUrl: './manager-data-chart.component.scss'
})
export class ManagerDataChartComponent {
  private userName: string = '';
  private totalLeave: number = 0;
  public employeeCount: number = 0;
  public leaveCount: number = 0;

  @ViewChild('totalLeave', { static: false }) totalLeaveCanvas?: ElementRef;
  date: string= new Date().toLocaleDateString();

  constructor(private dataSharingService: DataSharingServiceService ,
              private userAuthService: UserAuthService,
              private leaveService: LeaveServiceService,
              private employeeService: EmployeeServiceService,
              private router:Router) {
  }

  ngAfterViewInit() {
    this.getUserName();
  const employeeCount = this.employeeService.getAllEmployeeCount();
  const leaveCount = this.leaveService.getCountAllEmployeeLeave();
  forkJoin([employeeCount, leaveCount]).subscribe({
    next: (results) => {
      this.employeeCount = results[0].data;
      this.leaveCount = results[1].data;
      this.doughnutChart(this.leaveCount, this.employeeCount);
    },
    error: (error) => console.log(error)
  });
}
  getUserName() {
    this.userName = this.userAuthService.getName();
  }
  doughnutChart(num1: number, num2: number) {
    if (!this.totalLeaveCanvas) return;
    const ctx = this.totalLeaveCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Leavers', 'Workers'],
        datasets: [{
          label: 'Leave Balance',
          data: [num1, num2 - num1],
          backgroundColor: [
            'rgb(199,33,67)',
            'rgb(48,163,239)'
          ]
        }]}});}
  goHistory() {
    this.router.navigate(["/manageLeaveHistory"])
  }
}
