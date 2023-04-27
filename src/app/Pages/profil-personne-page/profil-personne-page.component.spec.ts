import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilPersonnePageComponent } from './profil-personne-page.component';

describe('ProfilPersonnePageComponent', () => {
  let component: ProfilPersonnePageComponent;
  let fixture: ComponentFixture<ProfilPersonnePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilPersonnePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilPersonnePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
