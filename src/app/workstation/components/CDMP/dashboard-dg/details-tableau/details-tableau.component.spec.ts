import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTableauComponent } from './details-tableau.component';

describe('DetailsTableauComponent', () => {
  let component: DetailsTableauComponent;
  let fixture: ComponentFixture<DetailsTableauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTableauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
