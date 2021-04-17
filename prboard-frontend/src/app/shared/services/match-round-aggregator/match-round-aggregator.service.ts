import { Injectable } from '@angular/core';
import { MatchSummary, MatchRoundSummary } from '../../models/match.models';

@Injectable({
  providedIn: 'root'
})
export class MatchRoundAggregatorService {

  constructor() { }

  aggregateMatchesIntoRounds(matchSummaries: MatchSummary[]): MatchRoundSummary[] {
    if (!matchSummaries || matchSummaries.length === 0) {
      return [];
    }

    const matchRounds: MatchRoundSummary[] = [];

    for (const matchSummary of matchSummaries) {
      const existingRound = matchRounds.find(p => p.uuid === matchSummary.matchRoundUuid);

      if (existingRound == null) {
        const newRound = new MatchRoundSummary();
        newRound.uuid = matchSummary.matchRoundUuid;
        newRound.name = matchSummary.matchRoundName;
        newRound.matches.push(matchSummary);
        matchRounds.push(newRound);
      } else {
        existingRound.matches.push(matchSummary);
      }
    }

    return matchRounds;
  }
}
