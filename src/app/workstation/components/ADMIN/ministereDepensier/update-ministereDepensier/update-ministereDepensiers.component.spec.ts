import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMinistereDepensierComponent } from './update-ministereDepensiers.component';

describe('UpdateMinistereDepensierComponent', () => {
  let component: UpdateMinistereDepensierComponent;
  let fixture: ComponentFixture<UpdateMinistereDepensierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMinistereDepensierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMinistereDepensierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
