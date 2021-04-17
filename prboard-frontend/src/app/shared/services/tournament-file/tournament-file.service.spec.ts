/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TournamentFileService } from './tournament-file.service';

describe('Service: TournamentFile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentFileService]
    });
  });

  it('should ...', inject([TournamentFileService], (service: TournamentFileService) => {
    expect(service).toBeTruthy();
  }));
});
