import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHistryComponent } from './manage-histry.component';

describe('ManageHistryComponent', () => {
  let component: ManageHistryComponent;
  let fixture: ComponentFixture<ManageHistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageHistryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageHistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
