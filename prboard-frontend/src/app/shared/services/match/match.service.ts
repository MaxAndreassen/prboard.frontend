import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig, APP_CONFIG } from '../../models/configuration.models';
import { MatchQueryRequest, MatchSummary, MatchDetailedSummary } from '../../models/match.models';
import { PaginatedList } from '../../models/base.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  listMatches(queryParams: MatchQueryRequest): Observable<PaginatedList<MatchSummary>> {
    const url = `${this.config.apiUrl}matches/list`;
    return this.http.post<PaginatedList<MatchSummary>>(url, queryParams);
  }

  getMatch(uuid: string): Observable<MatchDetailedSummary> {
    const url = `${this.config.apiUrl}matches/${uuid}`;
    return this.http.get<MatchDetailedSummary>(url);
  }
}
