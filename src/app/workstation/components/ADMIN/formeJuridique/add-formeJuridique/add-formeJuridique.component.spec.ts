import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFormeJuridiqueComponent } from './add-formeJuridique.component';


describe('AddFormeJuridiqueComponent', () => {
  let component: AddFormeJuridiqueComponent;
  let fixture: ComponentFixture<AddFormeJuridiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFormeJuridiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormeJuridiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
