import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedList } from '../../models/base.models';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';
import { TeamSummary, TeamUserQueryRequest, TeamUserSummary } from '../../models/team.models';

@Injectable({
  providedIn: 'root'
})
export class TeamUserService {
  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  listTeamUsers(request: TeamUserQueryRequest): Observable<PaginatedList<TeamUserSummary>> {
    const url = `${this.config.apiUrl}team-users/list`;
    return this.http.post<PaginatedList<TeamUserSummary>>(url, request);
  }

}
