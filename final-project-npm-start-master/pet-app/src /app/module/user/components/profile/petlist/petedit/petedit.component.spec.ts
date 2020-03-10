import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeteditComponent } from './petedit.component';

describe('PeteditComponent', () => {
  let component: PeteditComponent;
  let fixture: ComponentFixture<PeteditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeteditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
