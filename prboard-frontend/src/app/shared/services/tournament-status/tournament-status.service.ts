import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TournamentStatusSummary } from '../../models/tournaments.models';

@Injectable({
  providedIn: 'root'
})
export class TournamentStatusService {
  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  listTournamentStatuses(): Observable<TournamentStatusSummary[]> {
    const url = `${this.config.apiUrl}tournament-statuses/list`;
    return this.http.get<TournamentStatusSummary[]>(url);
  }
}
