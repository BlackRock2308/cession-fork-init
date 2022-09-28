import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaiementsDetailsComponent } from './list-paiements-details.component';

describe('ListPaiementsDetailsComponent', () => {
  let component: ListPaiementsDetailsComponent;
  let fixture: ComponentFixture<ListPaiementsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPaiementsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPaiementsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
