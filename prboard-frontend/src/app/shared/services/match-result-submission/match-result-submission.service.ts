import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatchResultSubmissionQueryRequest, MatchResultSubmissionSummary, MatchResultSubmissionEditor } from '../../models/match.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchResultSubmissionService {
  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  listMatchSubmissions(queryParams: MatchResultSubmissionQueryRequest): Observable<MatchResultSubmissionSummary[]> {
    const url = `${this.config.apiUrl}match-result-submissions/list`;
    return this.http.post<MatchResultSubmissionSummary[]>(url, queryParams);
  }

  listMatchSubmissionsWithEvidence(queryParams: MatchResultSubmissionQueryRequest): Observable<MatchResultSubmissionSummary[]> {
    const url = `${this.config.apiUrl}match-result-submissions/list/with-evidence`;
    return this.http.post<MatchResultSubmissionSummary[]>(url, queryParams);
  }

  listMatchSubmissionEditors(queryParams: MatchResultSubmissionQueryRequest): Observable<MatchResultSubmissionEditor[]> {
    const url = `${this.config.apiUrl}match-result-submissions/list/editors`;
    return this.http.post<MatchResultSubmissionEditor[]>(url, queryParams);
  }

  createMatchResultSubmission(editor: MatchResultSubmissionEditor): Observable<MatchResultSubmissionEditor> {
    const url = `${this.config.apiUrl}match-result-submissions/edit`;

    const formData: FormData = new FormData();
    if (!!editor.matchUuid) {
      formData.append('matchUuid', editor.matchUuid);
    }

    if (!!editor.submitterUuid) {
      formData.append('submitterUuid', editor.submitterUuid);
    }

    if (editor.isDispute === true || editor.isDispute === false) {
      formData.append('isDispute', editor.isDispute.toString());
    }


    if (!!editor.uuid) {
      formData.append('uuid', editor.uuid);
    }

    if (!!editor.matchResultScoreSubmissions) {
      formData.append('matchResultScoreSubmissionsJson', JSON.stringify(editor.matchResultScoreSubmissions));
    }

    if (!!editor.evidenceImages) {
      editor.evidenceImages.forEach(file => {
        if (!!file) {
          formData.append('evidenceImages', file, file.name);
        }
      });
    }

    if (!!editor.existingEvidenceImageUuids) {
      editor.existingEvidenceImageUuids.forEach(uuid => {
        if (!!uuid) {
          formData.append('existingEvidenceImageUuids', uuid);
        }
      });
    }

    return this.http.post<MatchResultSubmissionEditor>(url, formData, {
      headers: new HttpHeaders().set('enctype', 'multipart/form-data')
    });
  }
}
