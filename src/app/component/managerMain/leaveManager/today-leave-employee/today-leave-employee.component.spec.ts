import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayLeaveEmployeeComponent } from './today-leave-employee.component';

describe('TodayLeaveEmployeeComponent', () => {
  let component: TodayLeaveEmployeeComponent;
  let fixture: ComponentFixture<TodayLeaveEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodayLeaveEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodayLeaveEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
