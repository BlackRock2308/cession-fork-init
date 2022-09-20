import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementCDMPComponent } from './paiement-cdmp.component';

describe('PaiementCDMPComponent', () => {
  let component: PaiementCDMPComponent;
  let fixture: ComponentFixture<PaiementCDMPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementCDMPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementCDMPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
