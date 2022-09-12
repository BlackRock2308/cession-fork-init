import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualiserDocumentComponent } from './visualiser-document.component';

describe('VisualiserDocumentComponent', () => {
  let component: VisualiserDocumentComponent;
  let fixture: ComponentFixture<VisualiserDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualiserDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualiserDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
