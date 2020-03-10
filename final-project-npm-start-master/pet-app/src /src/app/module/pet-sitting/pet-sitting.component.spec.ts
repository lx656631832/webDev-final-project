import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSittingComponent } from './pet-sitting.component';

describe('PetSittingComponent', () => {
  let component: PetSittingComponent;
  let fixture: ComponentFixture<PetSittingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetSittingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetSittingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
