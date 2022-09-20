import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaiementPMEComponent } from './list-paiement-pme.component';

describe('ListPaiementPMEComponent', () => {
  let component: ListPaiementPMEComponent;
  let fixture: ComponentFixture<ListPaiementPMEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPaiementPMEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPaiementPMEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
