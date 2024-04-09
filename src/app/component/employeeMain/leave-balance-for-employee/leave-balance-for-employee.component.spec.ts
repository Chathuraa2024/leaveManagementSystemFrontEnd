import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalanceForEmployeeComponent } from './leave-balance-for-employee.component';

describe('LeaveBalanceForEmployeeComponent', () => {
  let component: LeaveBalanceForEmployeeComponent;
  let fixture: ComponentFixture<LeaveBalanceForEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveBalanceForEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveBalanceForEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
