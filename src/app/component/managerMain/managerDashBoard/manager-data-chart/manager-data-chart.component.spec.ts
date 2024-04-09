import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDataChartComponent } from './manager-data-chart.component';

describe('ManagerDataChartComponent', () => {
  let component: ManagerDataChartComponent;
  let fixture: ComponentFixture<ManagerDataChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerDataChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerDataChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
