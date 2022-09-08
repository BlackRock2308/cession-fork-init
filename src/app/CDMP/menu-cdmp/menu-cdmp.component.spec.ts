import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCdmpComponent } from './menu-cdmp.component';

describe('MenuCdmpComponent', () => {
  let component: MenuCdmpComponent;
  let fixture: ComponentFixture<MenuCdmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCdmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCdmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
