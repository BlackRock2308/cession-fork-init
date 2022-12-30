import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCentreDesServicesFiscauxComponent } from './add-centreDesServicesFiscaux.component';


describe('AddCentreDesServicesFiscauxComponent', () => {
  let component: AddCentreDesServicesFiscauxComponent;
  let fixture: ComponentFixture<AddCentreDesServicesFiscauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCentreDesServicesFiscauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCentreDesServicesFiscauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
