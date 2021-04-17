import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedList } from '../../models/base.models';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';
import { TeamEditor, TeamQueryRequest, TeamSummary, TeamWithMembersSummary } from '../../models/team.models';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  createTeam(editor: TeamEditor): Observable<TeamEditor> {
    const url = `${this.config.apiUrl}teams/edit`;
    return this.http.post<TeamEditor>(url, editor);
  }

  listTeams(request: TeamQueryRequest): Observable<PaginatedList<TeamSummary>> {
    const url = `${this.config.apiUrl}teams/list`;
    return this.http.post<PaginatedList<TeamSummary>>(url, request);
  }

  listTeamsWithMembers(request: TeamQueryRequest): Observable<PaginatedList<TeamWithMembersSummary>> {
    const url = `${this.config.apiUrl}teams/list/with-members`;
    return this.http.post<PaginatedList<TeamWithMembersSummary>>(url, request);
  }

  getTeamSummary(uuid: string): Observable<TeamSummary> {
    const url = `${this.config.apiUrl}teams/${uuid}/summary`;
    return this.http.get<TeamSummary>(url);
  }
}
