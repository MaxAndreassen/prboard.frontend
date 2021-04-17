/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TournamentPromoService } from './tournament-promo.service';

describe('Service: TournamentPromo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentPromoService]
    });
  });

  it('should ...', inject([TournamentPromoService], (service: TournamentPromoService) => {
    expect(service).toBeTruthy();
  }));
});
