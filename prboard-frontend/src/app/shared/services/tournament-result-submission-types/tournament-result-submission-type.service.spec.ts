/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TournamentResultSubmissionTypeService } from './tournament-result-submission-type.service';

describe('Service: TournamentResultSubmissionType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentResultSubmissionTypeService]
    });
  });

  it('should ...', inject([TournamentResultSubmissionTypeService], (service: TournamentResultSubmissionTypeService) => {
    expect(service).toBeTruthy();
  }));
});
