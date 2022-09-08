import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationBudgetaireComponent } from './identification-budgetaire.component';

describe('IdentificationBudgetaireComponent', () => {
  let component: IdentificationBudgetaireComponent;
  let fixture: ComponentFixture<IdentificationBudgetaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentificationBudgetaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificationBudgetaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
