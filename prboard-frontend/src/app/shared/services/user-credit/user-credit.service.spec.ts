/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserCreditService } from './user-credit.service';

describe('Service: UserCredit', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCreditService]
    });
  });

  it('should ...', inject([UserCreditService], (service: UserCreditService) => {
    expect(service).toBeTruthy();
  }));
});
