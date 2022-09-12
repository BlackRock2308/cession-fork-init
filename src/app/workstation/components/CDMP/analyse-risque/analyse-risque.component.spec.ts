import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseRisqueComponent } from './analyse-risque.component';

describe('AnalyseRisqueComponent', () => {
  let component: AnalyseRisqueComponent;
  let fixture: ComponentFixture<AnalyseRisqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyseRisqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyseRisqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
