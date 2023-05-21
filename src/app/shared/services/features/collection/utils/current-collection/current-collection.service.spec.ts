import { TestBed } from '@angular/core/testing';

import { CurrentCollectionService } from './current-collection.service';

describe('CurrentCollectionService', () => {
  let service: CurrentCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
