import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightViewComponent } from './highlight-view.component';

describe('HighlightViewComponent', () => {
  let component: HighlightViewComponent;
  let fixture: ComponentFixture<HighlightViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
