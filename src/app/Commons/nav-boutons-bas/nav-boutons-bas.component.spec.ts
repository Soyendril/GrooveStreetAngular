import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBoutonsBasComponent } from './nav-boutons-bas.component';

describe('NavBoutonsBasComponent', () => {
  let component: NavBoutonsBasComponent;
  let fixture: ComponentFixture<NavBoutonsBasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBoutonsBasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBoutonsBasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
