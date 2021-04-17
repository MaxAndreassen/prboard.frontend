/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TournamentGameService } from './tournament-game.service';

describe('Service: TournamentGame', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentGameService]
    });
  });

  it('should ...', inject([TournamentGameService], (service: TournamentGameService) => {
    expect(service).toBeTruthy();
  }));
});
