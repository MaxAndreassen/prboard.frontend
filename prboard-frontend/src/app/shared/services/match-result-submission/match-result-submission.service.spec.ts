/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MatchResultSubmissionService } from './match-result-submission.service';

describe('Service: MatchResultSubmission', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchResultSubmissionService]
    });
  });

  it('should ...', inject([MatchResultSubmissionService], (service: MatchResultSubmissionService) => {
    expect(service).toBeTruthy();
  }));
});
