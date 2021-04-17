/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KnockoutTournamentGeneratorService } from './knockout-tournament-generator.service';

describe('Service: KnockoutTournamentGenerator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KnockoutTournamentGeneratorService]
    });
  });

  it('should ...', inject([KnockoutTournamentGeneratorService], (service: KnockoutTournamentGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
