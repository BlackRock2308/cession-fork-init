import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsNineaComponent } from './informations-ninea.component';

describe('InformationsNineaComponent', () => {
  let component: InformationsNineaComponent;
  let fixture: ComponentFixture<InformationsNineaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationsNineaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationsNineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
