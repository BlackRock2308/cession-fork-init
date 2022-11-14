import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignerconventionPMEComponent } from './signerconvention-pme.component';

describe('SignerconventionPMEComponent', () => {
  let component: SignerconventionPMEComponent;
  let fixture: ComponentFixture<SignerconventionPMEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignerconventionPMEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignerconventionPMEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
