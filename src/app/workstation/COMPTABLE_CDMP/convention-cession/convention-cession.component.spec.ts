import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionCessionComponent } from './convention-cession.component';

describe('ConventionCessionComponent', () => {
  let component: ConventionCessionComponent;
  let fixture: ComponentFixture<ConventionCessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConventionCessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConventionCessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
