import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TournamentPlatformSummary } from '../../models/tournaments.models';

@Injectable({
  providedIn: 'root'
})
export class TournamentPlatformService {
  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  listTournamentPlatforms(): Observable<TournamentPlatformSummary[]> {
    const url = `${this.config.apiUrl}tournament-platforms/list`;
    return this.http.get<TournamentPlatformSummary[]>(url);
  }
}
