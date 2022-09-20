import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionEnregistreeComponent } from './convention-enregistree.component';

describe('ConventionEnregistreeComponent', () => {
  let component: ConventionEnregistreeComponent;
  let fixture: ComponentFixture<ConventionEnregistreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConventionEnregistreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConventionEnregistreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
