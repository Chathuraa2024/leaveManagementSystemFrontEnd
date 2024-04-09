import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {LeaveServiceService} from "../../../../service/leave-service.service";
import {DataSharingServiceService} from "../../../../service/data-sharing-service.service";
import {forkJoin, Observable} from "rxjs";
import {Chart, ChartConfiguration} from "chart.js/auto";
import {ManagerService} from "../../../../service/manager.service";
import {UserAuthService} from "../../../../service/user-auth.service";
import {EmployeeServiceService} from "../../../../service/employee-service.service";

@Component({
  selector: 'app-today-leave-employee',
  templateUrl: './today-leave-employee.component.html',
  styleUrl: './today-leave-employee.component.scss'
})
export class TodayLeaveEmployeeComponent {
  // private userName: string = '';
  // private totalLeave: any=[];
  // public employee: number =0;
  // public leave: number=0
  // private SE: number=0
  // private QA: number=0
  // private UD: number=0
  // private DE: number=0
  // private SA: number=0
  // private SAT: number=0
  // private PM: number=0
  // private BA: number=0
  // public employeeCount: Observable<any>= new Observable();
  // public leaveCount: Observable<any> = new Observable();
  // public date: Date = new Date();
  // private chartInstance!: Chart<"bar", number[], unknown>;
  // @ViewChild('myChart',{ static: false }) myChartCanvas?: ElementRef;
  // @ViewChild('totalLeave', {static: false}) totalLeaveCanvas?: ElementRef;
  // private empl:any=[];
  //
  // constructor(private managerService:ManagerService,private dataSharingService: DataSharingServiceService, private userAuthService: UserAuthService, private leaveService: LeaveServiceService, private employeeService: EmployeeServiceService) {
  // }
  //
  // ngAfterViewInit() {
  //   this.getUserName();
  //   this.search(this.date)
  // }
  //
  // ngOnInit(){
  //   this.getUserName();
  //   this.getAllEmployee();
  // }
  //
  // getUserName() {
  //   this.userName = this.userAuthService.getName();
  // }
  //
  //
  // barChart() {
  //   console.log(this.SE)
  //   if (!this.myChartCanvas) return;
  //   const ctx = this.myChartCanvas.nativeElement.getContext('2d');
  //   if (!ctx) return;
  //
  //   if (this.chartInstance) {
  //     this.chartInstance.destroy();
  //   }
  //   const employeeData: number[] = [
  //     this.SE as number,
  //     this.QA as number,
  //     this.UD as number,
  //     this.DE as number,
  //     this.SA as number,
  //     this.SAT as number,
  //     this.PM as number,
  //     this.BA as number
  //   ];
  //
  //   const chartConfig: ChartConfiguration<'bar'> = {
  //     type: 'bar',
  //     data: {
  //       labels: [
  //         'Software_Engineer',
  //         'Quality_Assurance',
  //         'UX_Designer',
  //         'DevOps_Engineer',
  //         'System_Administrator',
  //         'Security_Analyst',
  //         'Product_Manager',
  //         'Business_Analyst'
  //       ],
  //       datasets: [{
  //         label: 'Employee',
  //         data: employeeData,
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         y: { beginAtZero: true }
  //       }
  //     }
  //   };
  //   this.chartInstance = new Chart(ctx, chartConfig);
  //
  // }
  //
  // search(date:any | null) {
  //   if (date !== null) {
  //     this.employeeCount = this.employeeService.getAllEmployeeCount();
  //     this.leaveCount = this.leaveService.getCountDayEmployeeLeave(date);
  //     this.getTodayLeaveEmployee(date.toISOString().split('T')[0])
  //
  //   }else {
  //     const currentDate = new Date().toISOString().split('T')[0];
  //     this.employeeCount = this.employeeService.getAllEmployeeCount();
  //     this.leaveCount = this.leaveService.getCountAllEmployeeLeave();
  //     this.getTodayLeaveEmployee(currentDate)
  //   }
  //   forkJoin([this.employeeCount, this.leaveCount]).subscribe({
  //     next: (results) => {
  //       this.employee = results[0].data;
  //       this.leave = results[1].data;
  //       console.log(this.employee, this.leave);
  //     },
  //     error: (error) => console.log(error)
  //   });
  // }
  //
  // getTodayLeaveEmployee(date: string){
  //   this.leaveService.getLeaveListToday(date).subscribe(
  //     (res) => {
  //       this.totalLeave = res.data;
  //       console.log(this.totalLeave);
  //       this.countTodayEmployee(this.empl, this.totalLeave);
  //     });
  // }
  //
  //
  // getAllEmployee() {
  //   this.managerService.getAllEmployee().subscribe(
  //     (res) => {
  //       this.empl = res.data;
  //       console.log(this.empl)
  //       for(let e of  this.empl){
  //         let role: string = e.workerRole
  //         switch (role) {
  //           case 'Software_Engineer':
  //             this.SE++;
  //             break;
  //           case 'Quality_Assurance':
  //             this.QA++;
  //             break;
  //           case 'UX_Designer':
  //             this.UD++;
  //             break;
  //           case 'DevOps_Engineer':
  //             this.DE++;
  //             break
  //           case 'System_Administrator':
  //             this.SA++;
  //             break;
  //           case 'Security_Analyst':
  //             this.SAT++;
  //             break;
  //           case 'Product_Manager':
  //             this.PM++;
  //             break;
  //           case 'Business_Analyst':
  //             this.BA++;
  //             break
  //         }
  //       }
  //       console.log(this.empl)
  //
  //     }
  //   )
  //
  // }
  //
  // countTodayEmployee(empl: any , totalEmployee: any){
  //   for(let t of totalEmployee){
  //     for(let e of empl){
  //       if(t===e.userName){
  //         let role: string = e.workerRole
  //         switch (role) {
  //           case 'Software_Engineer':
  //             this.SE--;
  //             break;
  //           case 'Quality_Assurance':
  //             this.QA--;
  //             break;
  //           case 'UX_Designer':
  //             this.UD--;
  //             break;
  //           case 'DevOps_Engineer':
  //             this.DE--;
  //             break
  //           case 'System_Administrator':
  //             this.SA--;
  //             break;
  //           case 'Security_Analyst':
  //             this.SAT--;
  //             break;
  //           case 'Product_Manager':
  //             this.PM--;
  //             break;
  //           case 'Business_Analyst':
  //             this.BA--;
  //             break
  //         }
  //       }
  //     }
  //   }
  //   this.barChart();
  // }


}
