import { TestBed, inject } from '@angular/core/testing';

import { HttpInterceptororService } from './http-interceptoror.service';

describe('HttpInterceptororService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpInterceptororService]
    });
  });

  it('should be created', inject([HttpInterceptororService], (service: HttpInterceptororService) => {
    expect(service).toBeTruthy();
  }));
});
