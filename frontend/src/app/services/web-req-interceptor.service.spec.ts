import { TestBed } from '@angular/core/testing';

import { WebReqInterceptor } from './web-req.interceptor';

describe('WebReqInterceptorService', () => {
  let service: WebReqInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebReqInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
