import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesAdhesionComponent } from './demandes-adhesion.component';

describe('DemandesAdhesionComponent', () => {
  let component: DemandesAdhesionComponent;
  let fixture: ComponentFixture<DemandesAdhesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandesAdhesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandesAdhesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
