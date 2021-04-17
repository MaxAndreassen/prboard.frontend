import { Injectable } from '@angular/core';
import { MatchRoundSummary } from '../../models/match.models';
import { Tournament, Round, Match, Team } from '../../components/knockout-table/models/knockout-table.models';

@Injectable({
  providedIn: 'root'
})
export class KnockoutTournamentGeneratorService {

  constructor() { }

  generateTournamentFromMatchRounds(matchRounds: MatchRoundSummary[]): Tournament {
    const tournament = new Tournament();

    if (!matchRounds || matchRounds.length < 1) {
      return tournament;
    }

    for (const matchRound of matchRounds) {
      const round = new Round();
      round.name = matchRound.name;

      for (const matchSummary of matchRound.matches) {
        const match = new Match();
        match.name = matchSummary.name;

        for (const player of matchSummary.matchUserSummaries) {
          const team = new Team();
          team.name = !player.username ? (player.isByeUser ? 'N/A' : 'TBC') : player.username;
          team.score = (!matchSummary.winnerUuid && !matchSummary.isDraw) ? '' : player.score.toString();
          team.imageUrl = player.profileUrl;
          team.winner = player.isWinner;

          match.teams.push(team);
        }

        round.matches.push(match);
      }

      tournament.rounds.push(round);
    }

    return tournament;
  }
}
