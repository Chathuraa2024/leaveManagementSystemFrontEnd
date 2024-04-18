import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {PortalModule} from "@angular/cdk/portal";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterLink, RouterModule} from "@angular/router";
import { ManagerComponent } from './component/managerMain/managerDashBoard/manager/manager.component';
import { EmployeeComponent } from './component/employeeMain/employee/employee.component';
import { ForbidderComponent } from './component/forbidder/forbidder.component';
import {authGuard} from "./component/auth/auth.guard";
import {AuthInterceptor} from "./component/auth/auth.interceptor";
import {LoginServiceService} from "./service/login-service.service";
import {MatSidenavModule} from '@angular/material/sidenav';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { ManageEmployeeComponent } from './component/managerMain/manage-employee/manage-employee.component';
import { GetAllEmployeeComponent } from './component/managerMain/get-all-employee/get-all-employee.component';
import { UpdateEmployeeComponent } from './component/managerMain/update-employee/update-employee.component';
import { AddEmployeeComponent } from './component/managerMain/add-employee/add-employee.component';
import { LeaveManageComponent } from './component/managerMain/leaveManager/leave-manage/leave-manage.component';
import {MatListModule} from '@angular/material/list';
import { LeaveDetailsComponent } from './component/managerMain/leave-details/leave-details.component';
import { LeaveAddingComponent } from './component/employeeMain/leave-adding/leave-adding.component';
import { LeaveBalanceForEmployeeComponent } from './component/employeeMain/leave-balance-for-employee/leave-balance-for-employee.component';
import { EditEmployeeLeaveComponent } from './component/employeeMain/edit-employee-leave/edit-employee-leave.component';
import { EmployeeProfileComponent } from './component/employeeMain/employee-profile/employee-profile.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { LeaveHistoryComponent } from './component/employeeMain/leave-history/leave-history.component';
import { DataChartComponent } from './component/employeeMain/data-chart/data-chart.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {CalendarComponent} from "./component/calendar/calendar.component";
import { FullCalendarModule } from '@fullcalendar/angular';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ClockComponent } from './component/clock/clock.component';
import { ManageHistryComponent } from './component/managerMain/manageHistory/manage-histry/manage-histry.component';
import { ManagerDataChartComponent } from './component/managerMain/managerDashBoard/manager-data-chart/manager-data-chart.component';
import { LeaveManageDataChartComponent } from './component/managerMain/leaveManager/leave-manage-data-chart/leave-manage-data-chart.component';
import { HistoryDataChartComponent } from './component/managerMain/manageHistory/history-data-chart/history-data-chart.component';
import { DeleteEmployeeComponent } from './component/managerMain/delete-employee/delete-employee.component';
import { ConfirmationDialogComponentComponent } from './component/managerMain/confirmation-dialog-component/confirmation-dialog-component.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Needed for animations
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagerComponent,
    EmployeeComponent,
    ForbidderComponent,
    SideBarComponent,
    ManageEmployeeComponent,
    GetAllEmployeeComponent,
    UpdateEmployeeComponent,
    AddEmployeeComponent,
    LeaveManageComponent,
    LeaveDetailsComponent,
    LeaveAddingComponent,
    LeaveBalanceForEmployeeComponent,
    EditEmployeeLeaveComponent,
    EmployeeProfileComponent,
    LeaveHistoryComponent,
    DataChartComponent,
    CalendarComponent,
    ClockComponent,
    ManageHistryComponent,
    ManagerDataChartComponent,
    LeaveManageDataChartComponent,
    HistoryDataChartComponent,
    DeleteEmployeeComponent,
    ConfirmationDialogComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PortalModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FullCalendarModule,
    MatSnackBarModule,
    MatDialogModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      preventDuplicates: true,
    }),
  ],
  providers: [
    authGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi : true
    },
    LoginServiceService,
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
