import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualiserDemandesComponent } from './visualiser-demandes.component';

describe('VisualiserDemandesComponent', () => {
  let component: VisualiserDemandesComponent;
  let fixture: ComponentFixture<VisualiserDemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualiserDemandesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualiserDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
