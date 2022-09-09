import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheAnalyseComponent } from './tache-analyse.component';

describe('TacheAnalyseComponent', () => {
  let component: TacheAnalyseComponent;
  let fixture: ComponentFixture<TacheAnalyseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacheAnalyseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
