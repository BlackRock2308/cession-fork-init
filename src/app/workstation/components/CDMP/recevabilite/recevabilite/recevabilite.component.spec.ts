import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecevabiliteComponent } from './recevabilite.component';

describe('RecevabiliteComponent', () => {
  let component: RecevabiliteComponent;
  let fixture: ComponentFixture<RecevabiliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecevabiliteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecevabiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
