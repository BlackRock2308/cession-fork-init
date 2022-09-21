import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaimentsComponent } from './paiements.component';

describe('PaiementsComponent', () => {
  let component: PaimentsComponent;
  let fixture: ComponentFixture<PaimentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaimentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
