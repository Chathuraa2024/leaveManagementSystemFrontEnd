import {Component, ElementRef, ViewChild} from '@angular/core';
import {DataSharingServiceService} from "../../../../service/data-sharing-service.service";
import {UserAuthService} from "../../../../service/user-auth.service";
import {LeaveServiceService} from "../../../../service/leave-service.service";
import {EmployeeServiceService} from "../../../../service/employee-service.service";
import {forkJoin, Observable} from "rxjs";
import {Chart, ChartConfiguration, ChartTypeRegistry} from "chart.js/auto";
import {ManagerService} from "../../../../service/manager.service";
import {th} from "date-fns/locale";

@Component({
  selector: 'app-leave-manage-data-chart',
  templateUrl: './leave-manage-data-chart.component.html',
  styleUrl: './leave-manage-data-chart.component.scss'
})
export class LeaveManageDataChartComponent {
  private userName: string = '';
  private totalLeave: any=[];
  public employee: number =0;
  public leave: number=0
  private SE: number=0
  private QA: number=0
  private UD: number=0
  private DE: number=0
  private SA: number=0
  private SAT: number=0
  private PM: number=0
  private BA: number=0
  public employeeCount: Observable<any>= new Observable();
  public leaveCount: Observable<any> = new Observable();
  public date: Date = new Date();
  private chartInstance!: Chart<"doughnut", number[], unknown>;
  private barChartInstance: Chart | null = null
  @ViewChild('myChart',{ static: false }) myChartCanvas?: ElementRef;
  @ViewChild('totalLeave', {static: false}) totalLeaveCanvas?: ElementRef;
  private empl:any=[];

  constructor(private managerService:ManagerService,private dataSharingService: DataSharingServiceService, private userAuthService: UserAuthService, private leaveService: LeaveServiceService, private employeeService: EmployeeServiceService) {
  }

  ngAfterViewInit() {
    this.getUserName();
    this.search(this.date)
  }
  ngOnDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    if (this.barChartInstance) {
      this.barChartInstance.destroy();
    }
  }

  getUserName() {
    this.userName = this.userAuthService.getName();
  }

  doughnutChart(num1: number, num2: number) {
    if (!this.totalLeaveCanvas) return;
    const ctx = this.totalLeaveCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    const chartConfig: ChartConfiguration<'doughnut'> = {
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
        }]
      }
    };
    this.chartInstance = new Chart(ctx, chartConfig);
  }

  barChart() {
    if (!this.myChartCanvas) return;
    const ctx1 = this.myChartCanvas.nativeElement.getContext('2d');
    if (!ctx1) return;
    if (this.barChartInstance) {
      this.barChartInstance.destroy();
    }

    const employeeData: number[] = [
      this.SE as number,
      this.QA as number,
      this.UD as number,
      this.DE as number,
      this.SA as number,
      this.SAT as number,
      this.PM as number,
      this.BA as number
    ];

    const barChartConfig: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: [
          'Software_Engineer',
          'Quality_Assurance',
          'UX_Designer',
          'DevOps_Engineer',
          'System_Administrator',
          'Security_Analyst',
          'Product_Manager',
          'Business_Analyst'
        ],
        datasets: [{
          label: 'Employee',
          data: employeeData,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    };
    this.barChartInstance = new Chart(ctx1, barChartConfig);
  }

  search(date:any | null) {
    if (date !== null) {
      this.employeeCount = this.employeeService.getAllEmployeeCount();
      this.leaveCount = this.leaveService.getCountDayEmployeeLeave(date);
      this.getAllEmployee(date.toISOString().split('T')[0])
    }else {
      const currentDate = new Date().toISOString().split('T')[0];
      this.employeeCount = this.employeeService.getAllEmployeeCount();
      this.leaveCount = this.leaveService.getCountAllEmployeeLeave();
      this.getAllEmployee(currentDate)
    }
    forkJoin([this.employeeCount, this.leaveCount]).subscribe({
      next: (results) => {
        this.employee = results[0].data;
        this.leave = results[1].data;
        this.doughnutChart(this.leave, this.employee);
      },
      error: (error) => console.log(error)
    });
  }

  getTodayLeaveEmployee(date: string){
    this.leaveService.getLeaveListToday(date).subscribe(
      (res) => {
        this.totalLeave = res.data;
        this.countTodayEmployee(this.empl, this.totalLeave);
      });
  }
  getAllEmployee(date: string) {
    this.SE=0
    this.QA=0
    this.UD=0
    this.DE=0
    this.SA=0
    this.SAT=0
    this.PM=0
    this.BA=0
    this.managerService.getAllEmployee().subscribe(
      (res) => {
        this.empl = res.data;
        for(let e of  this.empl){
          let role: string = e.workerRole
          switch (role) {
            case 'Software_Engineer':
              this.SE++;
              break;
            case 'Quality_Assurance':
              this.QA++;
              break;
            case 'UX_Designer':
              this.UD++;
              break;
            case 'DevOps_Engineer':
              this.DE++;
              break
            case 'System_Administrator':
              this.SA++;
              break;
            case 'Security_Analyst':
              this.SAT++;
              break;
            case 'Product_Manager':
              this.PM++;
              break;
            case 'Business_Analyst':
              this.BA++;
              break
          }
        }
        this.getTodayLeaveEmployee(date);
      })}

  countTodayEmployee(empl: any , totalEmployee: any){
    for(let t of totalEmployee){
      for(let e of empl){
        if(t===e.userName){
          let role: string = e.workerRole
          switch (role) {
            case 'Software_Engineer':
              this.SE--;
              break;
            case 'Quality_Assurance':
              this.QA--;
              break;
            case 'UX_Designer':
              this.UD--;
              break;
            case 'DevOps_Engineer':
              this.DE--;
              break
            case 'System_Administrator':
              this.SA--;
              break;
            case 'Security_Analyst':
              this.SAT--;
              break;
            case 'Product_Manager':
              this.PM--;
              break;
            case 'Business_Analyst':
              this.BA--;
              break
          }}}}
    this.barChart();
  }


}
