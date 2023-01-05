import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParametrageDecoteComponent } from './list-parametreDecote.component';

describe('ListParametrageDecoteComponent', () => {
  let component: ListParametrageDecoteComponent;
  let fixture: ComponentFixture<ListParametrageDecoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListParametrageDecoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListParametrageDecoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
