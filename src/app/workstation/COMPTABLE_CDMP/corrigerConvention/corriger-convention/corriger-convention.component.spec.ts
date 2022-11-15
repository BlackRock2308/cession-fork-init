import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrigerConventionComponent } from './corriger-convention.component';

describe('CorrigerConventionComponent', () => {
  let component: CorrigerConventionComponent;
  let fixture: ComponentFixture<CorrigerConventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrigerConventionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrigerConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
