import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierPaiementPMEComponent } from './modifier-paiement-pme.component';

describe('ModifierPaiementPMEComponent', () => {
  let component: ModifierPaiementPMEComponent;
  let fixture: ComponentFixture<ModifierPaiementPMEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierPaiementPMEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierPaiementPMEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
