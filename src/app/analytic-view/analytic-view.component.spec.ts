import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticViewComponent } from './analytic-view.component';
import { AppService } from '../app.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AnalyticViewComponent', () => {
  let component: AnalyticViewComponent;
  let fixture: ComponentFixture<AnalyticViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [AppService],
      declarations: [ AnalyticViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
