import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFormeJuridiqueComponent } from './list-formeJuridiques.component';

describe('ListFormeJuridiqueComponent', () => {
  let component: ListFormeJuridiqueComponent;
  let fixture: ComponentFixture<ListFormeJuridiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFormeJuridiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFormeJuridiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
