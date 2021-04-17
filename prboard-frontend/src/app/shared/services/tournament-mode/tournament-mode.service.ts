import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TournamentModeSummary } from '../../models/tournaments.models';

@Injectable({
  providedIn: 'root'
})
export class TournamentModeService {
  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  listTournamentModes(): Observable<TournamentModeSummary[]> {
    const url = `${this.config.apiUrl}tournament-modes/list`;
    return this.http.get<TournamentModeSummary[]>(url);
  }
}
