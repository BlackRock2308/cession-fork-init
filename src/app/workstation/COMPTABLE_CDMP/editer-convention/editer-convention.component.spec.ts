import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerConventionComponent } from './editer-convention.component';

describe('EditerConventionComponent', () => {
  let component: EditerConventionComponent;
  let fixture: ComponentFixture<EditerConventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditerConventionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
