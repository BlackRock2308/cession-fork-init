import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsComplementaireComponent } from './informations-complementaire.component';

describe('InformationsComplementaireComponent', () => {
  let component: InformationsComplementaireComponent;
  let fixture: ComponentFixture<InformationsComplementaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationsComplementaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationsComplementaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
