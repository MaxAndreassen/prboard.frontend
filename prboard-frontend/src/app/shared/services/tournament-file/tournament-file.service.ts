import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';
import { HttpClient } from '@angular/common/http';
import { TournamentFileQueryRequest, TournamentFileSummary } from '../../models/tournaments.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentFileService {

  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  listFiles(request: TournamentFileQueryRequest): Observable<TournamentFileSummary[]> {
    const url = `${this.config.apiUrl}tournament-files/list`;
    return this.http.post<TournamentFileSummary[]>(url, request);
  }
}
