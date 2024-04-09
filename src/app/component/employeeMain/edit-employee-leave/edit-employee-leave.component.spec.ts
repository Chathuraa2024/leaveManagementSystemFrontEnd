import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeLeaveComponent } from './edit-employee-leave.component';

describe('EditEmployeeLeaveComponent', () => {
  let component: EditEmployeeLeaveComponent;
  let fixture: ComponentFixture<EditEmployeeLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEmployeeLeaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEmployeeLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
