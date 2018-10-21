import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingViewComponent } from './tracking-view.component';
import { ChartModule } from 'angular-highcharts';
import { HttpClientModule } from '@angular/common/http';

describe('TrackingViewComponent', () => {
  let component: TrackingViewComponent;
  let fixture: ComponentFixture<TrackingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChartModule, HttpClientModule],
      declarations: [ TrackingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
