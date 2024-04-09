import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveManageDataChartComponent } from './leave-manage-data-chart.component';

describe('LeaveManageDataChartComponent', () => {
  let component: LeaveManageDataChartComponent;
  let fixture: ComponentFixture<LeaveManageDataChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveManageDataChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveManageDataChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
