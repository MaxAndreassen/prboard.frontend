import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';
import { HttpClient } from '@angular/common/http';
import { MatchResultSubmissionFileSummary, MatchResultSubmissionQueryRequest, MatchResultSubmissionFileQueryRequest } from '../../models/match.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchResultSubmissionFileService {

  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  listFiles(request: MatchResultSubmissionFileQueryRequest): Observable<MatchResultSubmissionFileSummary[]> {
    const url = `${this.config.apiUrl}match-result-submission-files/list`;
    return this.http.post<MatchResultSubmissionFileSummary[]>(url, request);
  }
}
