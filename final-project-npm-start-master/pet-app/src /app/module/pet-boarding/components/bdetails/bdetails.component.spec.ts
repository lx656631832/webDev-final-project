import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdetailsComponent } from './bdetails.component';

describe('BdetailsComponent', () => {
  let component: BdetailsComponent;
  let fixture: ComponentFixture<BdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
