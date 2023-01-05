import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMinistereDepensierComponent } from './list-ministereDepensiers.component';

describe('ListMinistereDepensierComponent', () => {
  let component: ListMinistereDepensierComponent;
  let fixture: ComponentFixture<ListMinistereDepensierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMinistereDepensierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMinistereDepensierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
