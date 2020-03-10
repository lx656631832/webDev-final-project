import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdetailsComponent } from './sdetails.component';

describe('SdetailsComponent', () => {
  let component: SdetailsComponent;
  let fixture: ComponentFixture<SdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
