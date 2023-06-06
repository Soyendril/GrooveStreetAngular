import { TestBed } from '@angular/core/testing';

import { ProfilNavigationService } from './profil-navigation.service';

describe('ProfilNavigationService', () => {
  let service: ProfilNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
