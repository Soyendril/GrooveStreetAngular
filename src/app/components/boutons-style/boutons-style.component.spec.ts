import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutonsStyleComponent } from './boutons-style.component';

describe('BoutonsStyleComponent', () => {
  let component: BoutonsStyleComponent;
  let fixture: ComponentFixture<BoutonsStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoutonsStyleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutonsStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
