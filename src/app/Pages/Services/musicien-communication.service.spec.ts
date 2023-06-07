import { TestBed } from '@angular/core/testing';

import { MusicienCommunicationService } from './musicien-communication.service';

describe('MusicienCommunicationService', () => {
  let service: MusicienCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicienCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
