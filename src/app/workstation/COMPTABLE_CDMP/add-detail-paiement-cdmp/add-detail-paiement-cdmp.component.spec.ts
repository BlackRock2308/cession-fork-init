import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDetailPaiementCDMPComponent } from './add-detail-paiement-cdmp.component';

describe('PaiementCDMPComponent', () => {
  let component: AddDetailPaiementCDMPComponent;
  let fixture: ComponentFixture<AddDetailPaiementCDMPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDetailPaiementCDMPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDetailPaiementCDMPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
