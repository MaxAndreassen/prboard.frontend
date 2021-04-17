/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TournamentPlatformService } from './tournament-platform.service';

describe('Service: TournamentPlatform', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentPlatformService]
    });
  });

  it('should ...', inject([TournamentPlatformService], (service: TournamentPlatformService) => {
    expect(service).toBeTruthy();
  }));
});
