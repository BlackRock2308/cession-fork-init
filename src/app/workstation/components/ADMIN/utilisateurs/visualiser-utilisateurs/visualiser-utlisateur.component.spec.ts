import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUtilisateurComponent } from './visualiser-utlisateur.component';

describe('ViewUtilisateurComponent', () => {
  let component: ViewUtilisateurComponent;
  let fixture: ComponentFixture<ViewUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUtilisateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
