/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TournamentTypeService } from './tournament-type.service';

describe('Service: TournamentType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentTypeService]
    });
  });

  it('should ...', inject([TournamentTypeService], (service: TournamentTypeService) => {
    expect(service).toBeTruthy();
  }));
});
