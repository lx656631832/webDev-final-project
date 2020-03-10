import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsearchComponent } from './ssearch.component';

describe('SsearchComponent', () => {
  let component: SsearchComponent;
  let fixture: ComponentFixture<SsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
