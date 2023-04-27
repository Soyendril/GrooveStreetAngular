import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulairePageComponent } from './formulaire-page.component';

describe('FormulairePageComponent', () => {
  let component: FormulairePageComponent;
  let fixture: ComponentFixture<FormulairePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulairePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulairePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
