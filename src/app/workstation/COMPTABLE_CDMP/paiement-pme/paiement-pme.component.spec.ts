import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementPMEComponent } from './paiement-pme.component';

describe('PaiementPMEComponent', () => {
  let component: PaiementPMEComponent;
  let fixture: ComponentFixture<PaiementPMEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementPMEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementPMEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
