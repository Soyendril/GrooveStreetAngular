import { TestBed } from '@angular/core/testing';

import { MusicienService } from './musicien.service';

describe('MusicienServiceService', () => {
  let service: MusicienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
