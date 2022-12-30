import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCentreDesServicesFiscauxComponent } from './update-centreDesServicesFiscaux.component';

describe('UpdateCentreDesServicesFiscauxComponent', () => {
  let component: UpdateCentreDesServicesFiscauxComponent;
  let fixture: ComponentFixture<UpdateCentreDesServicesFiscauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCentreDesServicesFiscauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCentreDesServicesFiscauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
