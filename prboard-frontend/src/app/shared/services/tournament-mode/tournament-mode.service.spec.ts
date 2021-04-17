/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TournamentModeService } from './tournament-mode.service';

describe('Service: TournamentMode', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentModeService]
    });
  });

  it('should ...', inject([TournamentModeService], (service: TournamentModeService) => {
    expect(service).toBeTruthy();
  }));
});
