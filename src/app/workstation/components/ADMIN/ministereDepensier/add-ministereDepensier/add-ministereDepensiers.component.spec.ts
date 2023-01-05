import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMinistereDepensierComponent } from './add-ministereDepensiers.component';

describe('AddMinistereDepensierComponent', () => {
  let component: AddMinistereDepensierComponent;
  let fixture: ComponentFixture<AddMinistereDepensierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMinistereDepensierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMinistereDepensierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
