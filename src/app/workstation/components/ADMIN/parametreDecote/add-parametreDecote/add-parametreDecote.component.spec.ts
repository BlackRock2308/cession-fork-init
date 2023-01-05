import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddParametrageDecoteComponent } from './add-parametreDecote.component';


describe('AddParametrageDecoteComponent', () => {
  let component: AddParametrageDecoteComponent;
  let fixture: ComponentFixture<AddParametrageDecoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParametrageDecoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParametrageDecoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
