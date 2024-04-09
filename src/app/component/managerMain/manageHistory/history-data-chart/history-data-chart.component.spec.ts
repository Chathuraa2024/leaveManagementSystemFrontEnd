import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDataChartComponent } from './history-data-chart.component';

describe('HistoryDataChartComponent', () => {
  let component: HistoryDataChartComponent;
  let fixture: ComponentFixture<HistoryDataChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryDataChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryDataChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
