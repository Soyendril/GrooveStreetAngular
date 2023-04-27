import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixPersonnePageComponent } from './choix-personne-page.component';

describe('ChoixPersonnePageComponent', () => {
  let component: ChoixPersonnePageComponent;
  let fixture: ComponentFixture<ChoixPersonnePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoixPersonnePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoixPersonnePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
