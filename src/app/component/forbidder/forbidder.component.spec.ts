import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbidderComponent } from './forbidder.component';

describe('ForbidderComponent', () => {
  let component: ForbidderComponent;
  let fixture: ComponentFixture<ForbidderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForbidderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForbidderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
