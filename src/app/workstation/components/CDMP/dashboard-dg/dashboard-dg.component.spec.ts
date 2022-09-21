import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDGComponent } from './dashboard-dg.component';

describe('DashboardDGComponent', () => {
  let component: DashboardDGComponent;
  let fixture: ComponentFixture<DashboardDGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
