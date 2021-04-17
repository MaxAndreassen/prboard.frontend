import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';

@Injectable({
  providedIn: 'root'
})
export class TournamentResultSubmissionTypeService {
  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  listTournamentResultSubmissionTypes(): Observable<any[]> {
    const url = `${this.config.apiUrl}tournament-type-submissions/list`;
    return this.http.get<any[]>(url);
  }
}
