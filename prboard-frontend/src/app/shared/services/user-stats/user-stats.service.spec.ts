/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserStatsService } from './user-stats.service';

describe('Service: UserStats', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserStatsService]
    });
  });

  it('should ...', inject([UserStatsService], (service: UserStatsService) => {
    expect(service).toBeTruthy();
  }));
});
