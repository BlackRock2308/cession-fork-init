import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaiementCdmpComponent } from './list-detail-paiement-cdmp.component';

describe('ListPaiementCdmpComponent', () => {
  let component: ListPaiementCdmpComponent;
  let fixture: ComponentFixture<ListPaiementCdmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPaiementCdmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPaiementCdmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
