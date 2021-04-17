/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TournamentStatusService } from './tournament-status.service';

describe('Service: TournamentStatus', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentStatusService]
    });
  });

  it('should ...', inject([TournamentStatusService], (service: TournamentStatusService) => {
    expect(service).toBeTruthy();
  }));
});
