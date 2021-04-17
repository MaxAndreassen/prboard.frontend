/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TeamUserService } from './team-user.service';

describe('Service: TeamUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamUserService]
    });
  });

  it('should ...', inject([TeamUserService], (service: TeamUserService) => {
    expect(service).toBeTruthy();
  }));
});
