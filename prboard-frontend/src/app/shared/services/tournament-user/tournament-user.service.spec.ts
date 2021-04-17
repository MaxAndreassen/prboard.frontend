/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TournamentUserService } from './tournament-user.service';

describe('Service: TournamentUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentUserService]
    });
  });

  it('should ...', inject([TournamentUserService], (service: TournamentUserService) => {
    expect(service).toBeTruthy();
  }));
});
