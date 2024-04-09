import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaderComponent } from './hader.component';

describe('HaderComponent', () => {
  let component: HaderComponent;
  let fixture: ComponentFixture<HaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
