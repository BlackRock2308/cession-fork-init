import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicmodalComponent } from './dynamicmodal.component';

describe('DynamicmodalComponent', () => {
  let component: DynamicmodalComponent;
  let fixture: ComponentFixture<DynamicmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
