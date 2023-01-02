import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateParametrageDecoteComponent } from './update-parametreDecote.component';

describe('UpdateParametrageDecoteComponent', () => {
  let component: UpdateParametrageDecoteComponent;
  let fixture: ComponentFixture<UpdateParametrageDecoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateParametrageDecoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateParametrageDecoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
