import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementDocumentsComponent } from './complement_documents.component';

describe('ComplementDocumentsComponent', () => {
  let component: ComplementDocumentsComponent;
  let fixture: ComponentFixture<ComplementDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplementDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplementDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
