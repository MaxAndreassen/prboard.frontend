import { Injectable, Inject } from '@angular/core';
import { TournamentGameSummary } from '../../models/tournaments.models';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentGameService {
  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  listTournamentGames(): Observable<TournamentGameSummary[]> {
    const url = `${this.config.apiUrl}tournament-games/list`;
    return this.http.get<TournamentGameSummary[]>(url);
  }
}
