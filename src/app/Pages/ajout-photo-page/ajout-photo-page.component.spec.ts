import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPhotoPageComponent } from './ajout-photo-page.component';

describe('AjoutPhotoPageComponent', () => {
  let component: AjoutPhotoPageComponent;
  let fixture: ComponentFixture<AjoutPhotoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutPhotoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutPhotoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
