import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosPMEComponent } from './infos-pme.component';

describe('InfosPMEComponent', () => {
  let component: InfosPMEComponent;
  let fixture: ComponentFixture<InfosPMEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosPMEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosPMEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
