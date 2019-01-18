import { TestBed, inject } from '@angular/core/testing';

import { BetaService } from './beta.service';

describe('BetaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BetaService]
    });
  });

  it('should be created', inject([BetaService], (service: BetaService) => {
    expect(service).toBeTruthy();
  }));
});
