import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveAddingComponent } from './leave-adding.component';

describe('LeaveAddingComponent', () => {
  let component: LeaveAddingComponent;
  let fixture: ComponentFixture<LeaveAddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveAddingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
