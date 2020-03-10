import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetBoardingComponent } from './pet-boarding.component';

describe('PetBoardingComponent', () => {
  let component: PetBoardingComponent;
  let fixture: ComponentFixture<PetBoardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetBoardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetBoardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
