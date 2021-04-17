import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TournamentUserEditor, TournamentUserQueryRequest, TournamentUserSummary, TournamentUserDetailedSummary } from '../../models/tournaments.models';

@Injectable({
  providedIn: 'root'
})
export class TournamentUserService {
  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  createTournamentUser(editor: TournamentUserEditor): Observable<TournamentUserEditor> {
    const url = `${this.config.apiUrl}tournament-users/edit`;
    return this.http.post<TournamentUserEditor>(url, editor);
  }

  listTournamentUsers(request: TournamentUserQueryRequest): Observable<TournamentUserEditor[]> {
    const url = `${this.config.apiUrl}tournament-users/list`;
    return this.http.post<TournamentUserEditor[]>(url, request);
  }

  listTournamentUserSummaries(request: TournamentUserQueryRequest): Observable<TournamentUserSummary[]> {
    const url = `${this.config.apiUrl}tournament-users/list/summary`;
    return this.http.post<TournamentUserSummary[]>(url, request);
  }

  listDetailedTournamentUserSummaries(request: TournamentUserQueryRequest): Observable<TournamentUserDetailedSummary[]> {
    const url = `${this.config.apiUrl}tournament-users/list/detailed-summary`;
    return this.http.post<TournamentUserDetailedSummary[]>(url, request);
  }
}
