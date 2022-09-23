import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeConventionsComponent } from './liste-conventions.component';

describe('ListeConventionsComponent', () => {
  let component: ListeConventionsComponent;
  let fixture: ComponentFixture<ListeConventionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeConventionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeConventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
