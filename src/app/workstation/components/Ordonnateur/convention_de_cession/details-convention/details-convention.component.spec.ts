import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsConventionComponent } from './details-convention.component';

describe('DetailsConventionComponent', () => {
  let component: DetailsConventionComponent;
  let fixture: ComponentFixture<DetailsConventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsConventionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
