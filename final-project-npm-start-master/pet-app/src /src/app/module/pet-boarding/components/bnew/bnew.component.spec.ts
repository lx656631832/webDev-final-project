import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BnewComponent } from './bnew.component';

describe('BnewComponent', () => {
  let component: BnewComponent;
  let fixture: ComponentFixture<BnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
