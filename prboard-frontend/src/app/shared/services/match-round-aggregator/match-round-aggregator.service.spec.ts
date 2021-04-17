/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MatchRoundAggregatorService } from './match-round-aggregator.service';

describe('Service: MatchRoundAggregator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchRoundAggregatorService]
    });
  });

  it('should ...', inject([MatchRoundAggregatorService], (service: MatchRoundAggregatorService) => {
    expect(service).toBeTruthy();
  }));
});
