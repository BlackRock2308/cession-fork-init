import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesCessionComponent } from './demandes-cession.component';

describe('DemandesConventionComponent', () => {
  let component: DemandesCessionComponent;
  let fixture: ComponentFixture<DemandesCessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandesCessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandesCessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
