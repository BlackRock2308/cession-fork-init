import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDetailsPaiementPMEComponent } from './add-detail-paiement-pme.component';

describe('PaiementPMEComponent', () => {
  let component: AddDetailsPaiementPMEComponent;
  let fixture: ComponentFixture<AddDetailsPaiementPMEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDetailsPaiementPMEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDetailsPaiementPMEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
