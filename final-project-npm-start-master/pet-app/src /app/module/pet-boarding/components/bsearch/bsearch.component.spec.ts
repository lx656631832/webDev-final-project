import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsearchComponent } from './bsearch.component';

describe('BsearchComponent', () => {
  let component: BsearchComponent;
  let fixture: ComponentFixture<BsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
