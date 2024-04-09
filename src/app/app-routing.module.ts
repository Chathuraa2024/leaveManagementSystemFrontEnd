import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {ManagerComponent} from "./component/managerMain/managerDashBoard/manager/manager.component";
import {EmployeeComponent} from "./component/employeeMain/employee/employee.component";
import {HaderComponent} from "./component/hader/hader.component";
import {ForbidderComponent} from "./component/forbidder/forbidder.component";
import {authGuard} from "./component/auth/auth.guard";
import {ManageEmployeeComponent} from "./component/managerMain/manage-employee/manage-employee.component";
import {UpdateEmployeeComponent} from "./component/managerMain/update-employee/update-employee.component";
import {AddEmployeeComponent} from "./component/managerMain/add-employee/add-employee.component";
import {LeaveManageComponent} from "./component/managerMain/leaveManager/leave-manage/leave-manage.component";
import {LeaveDetailsComponent} from "./component/managerMain/leave-details/leave-details.component";
import {LeaveAddingComponent} from "./component/employeeMain/leave-adding/leave-adding.component";
import {EditEmployeeLeaveComponent} from "./component/employeeMain/edit-employee-leave/edit-employee-leave.component";
import {EmployeeProfileComponent} from "./component/employeeMain/employee-profile/employee-profile.component";
import {LeaveHistoryComponent} from "./component/employeeMain/leave-history/leave-history.component";
import {CalendarComponent} from "./component/calendar/calendar.component";
import {ManageHistryComponent} from "./component/managerMain/manageHistory/manage-histry/manage-histry.component";

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'manager/:userName',component:ManagerComponent, canActivate: [authGuard], data:{roles:['MANAGER']}},
  {path:'employee/:userName',component:EmployeeComponent,canActivate: [authGuard], data:{roles:['EMPLOYEE']}},
  {path:'header', component:HaderComponent},
  {path:'forbidden', component:ForbidderComponent},
  {path:'manageEmployee', component:ManageEmployeeComponent,canActivate: [authGuard], data:{roles:['MANAGER']}},
  {path:'updateEmployee/:userName' , component:UpdateEmployeeComponent ,canActivate: [authGuard], data:{roles:['MANAGER']}},
  {path:'addEmployee', component:AddEmployeeComponent , canActivate: [authGuard], data:{roles:['MANAGER']}},
  {path:'leaveManage', component: LeaveManageComponent,canActivate: [authGuard], data:{roles:['MANAGER']}},
  {path:'leaveDetails/:userName', component: LeaveDetailsComponent ,canActivate: [authGuard], data:{roles:['MANAGER']}},
  {path: 'leaveAdding',component: LeaveAddingComponent,canActivate: [authGuard], data:{roles:['EMPLOYEE']}},
  {path: 'editLeave/:id', component: EditEmployeeLeaveComponent,canActivate: [authGuard], data:{roles:['EMPLOYEE']}},
  {path: 'employeeProfile', component: EmployeeProfileComponent,canActivate: [authGuard], data:{roles:['EMPLOYEE']}},
  {path: 'leaveHistory' , component: LeaveHistoryComponent,canActivate: [authGuard], data:{roles:['EMPLOYEE']}},
  {path: 'calendar' , component:CalendarComponent},
  {path:'manageLeaveHistory', component:ManageHistryComponent,canActivate: [authGuard], data:{roles:['MANAGER']}}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
