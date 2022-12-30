import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCentreDesServicesFiscauxComponent } from './list-centreDesServicesFiscaux.component';

describe('ListCentreDesServicesFiscauxComponent', () => {
  let component: ListCentreDesServicesFiscauxComponent;
  let fixture: ComponentFixture<ListCentreDesServicesFiscauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCentreDesServicesFiscauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCentreDesServicesFiscauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
