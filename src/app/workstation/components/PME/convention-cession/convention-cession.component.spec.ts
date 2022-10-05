import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionCessionPMEComponent } from './convention-cession.component';

describe('ConventionCessionPMEComponent', () => {
  let component: ConventionCessionPMEComponent;
  let fixture: ComponentFixture<ConventionCessionPMEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConventionCessionPMEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConventionCessionPMEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
