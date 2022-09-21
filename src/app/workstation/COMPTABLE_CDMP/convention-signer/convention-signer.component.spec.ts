import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionSignerComponent } from './convention-signer.component';

describe('ConventionSignerComponent', () => {
  let component: ConventionSignerComponent;
  let fixture: ComponentFixture<ConventionSignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConventionSignerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConventionSignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
