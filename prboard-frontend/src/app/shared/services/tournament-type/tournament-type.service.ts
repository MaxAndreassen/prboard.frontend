import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';
import { HttpClient } from '@angular/common/http';
import { TournamentTypeSummary } from '../../models/tournaments.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentTypeService {

  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  listTournamentTypes(): Observable<TournamentTypeSummary[]> {
    const url = `${this.config.apiUrl}tournament-types/list`;
    return this.http.get<TournamentTypeSummary[]>(url);
  }
}
