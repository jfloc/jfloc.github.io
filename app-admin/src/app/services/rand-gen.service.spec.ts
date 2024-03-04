import { TestBed } from '@angular/core/testing';

import { RandGenService } from './rand-gen.service';

describe('RandGenService', () => {
  let service: RandGenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandGenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
