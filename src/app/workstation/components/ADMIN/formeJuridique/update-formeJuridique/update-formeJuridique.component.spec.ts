import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFormeJuridiqueComponent } from './update-formeJuridique.component';

describe('UpdateFormeJuridiqueComponent', () => {
  let component: UpdateFormeJuridiqueComponent;
  let fixture: ComponentFixture<UpdateFormeJuridiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFormeJuridiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFormeJuridiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
