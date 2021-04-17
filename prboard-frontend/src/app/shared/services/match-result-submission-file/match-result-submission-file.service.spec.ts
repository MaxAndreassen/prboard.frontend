/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MatchResultSubmissionFileService } from './match-result-submission-file.service';

describe('Service: MatchResultSubmissionFile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchResultSubmissionFileService]
    });
  });

  it('should ...', inject([MatchResultSubmissionFileService], (service: MatchResultSubmissionFileService) => {
    expect(service).toBeTruthy();
  }));
});
