import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifierDemandeCessionComponent } from './verifier-demande-cession.component';

describe('VerifierDemandeCessionComponent', () => {
  let component: VerifierDemandeCessionComponent;
  let fixture: ComponentFixture<VerifierDemandeCessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifierDemandeCessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifierDemandeCessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
