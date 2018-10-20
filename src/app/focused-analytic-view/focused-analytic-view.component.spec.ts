import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusedAnalyticViewComponent } from './focused-analytic-view.component';
import { ChartModule } from 'angular-highcharts';
import { RouterTestingModule } from '@angular/router/testing';
import { AppService } from '../app.service';
import { HttpClientModule } from '@angular/common/http';

describe('FocusedAnalyticViewComponent', () => {
  let component: FocusedAnalyticViewComponent;
  let fixture: ComponentFixture<FocusedAnalyticViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChartModule, RouterTestingModule, HttpClientModule],
      providers: [AppService],
      declarations: [ FocusedAnalyticViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusedAnalyticViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
