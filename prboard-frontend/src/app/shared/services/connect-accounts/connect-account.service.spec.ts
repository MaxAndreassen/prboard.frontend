/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConnectAccountService } from './connect-account.service';

describe('Service: ConnectAccount', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnectAccountService]
    });
  });

  it('should ...', inject([ConnectAccountService], (service: ConnectAccountService) => {
    expect(service).toBeTruthy();
  }));
});
