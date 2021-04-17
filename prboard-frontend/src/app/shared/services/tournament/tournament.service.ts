import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { IAppConfig, APP_CONFIG } from '../../models/configuration.models';
import { Observable } from 'rxjs';
import { PaginatedList } from '../../models/base.models';
import { TournamentEditor, TournamentQueryRequest, TournamentSummary } from '../../models/tournaments.models';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  createTournament(editor: TournamentEditor): Observable<HttpEvent<TournamentEditor>> {
    const url = `${this.config.apiUrl}tournaments/edit`;

    const formData: FormData = new FormData();
    if (!!editor.name) {
      formData.append('name', editor.name);
    }

    if (!!editor.tournamentStartEmailInfo) {
      formData.append('tournamentStartEmailInfo', editor.tournamentStartEmailInfo);
    }

    if (!!editor.description) {
      formData.append('description', editor.description);
    }

    if (!!editor.buyIn) {
      formData.append('buyIn', editor.buyIn.toString());
    }

    if (!!editor.uuid) {
      formData.append('uuid', editor.uuid);
    }

    if (!!editor.prize) {
      formData.append('prize', editor.prize);
    }

    if (!!editor.isPrivate) {
      formData.append('isPrivate', editor.isPrivate.toString());
    }

    if (!!editor.organiserUserUuid) {
      formData.append('organiseUserUuid', editor.organiserUserUuid);
    }

    if (!!editor.coverImage) {
      formData.append('coverImage', editor.coverImage, editor.coverImage.name);
    }

    if (!!editor.existingCoverImageUuid) {
      formData.append('existingCoverImageUuid', editor.existingCoverImageUuid);
    }

    if (!!editor.bracketImage) {
      formData.append('bracketImage', editor.bracketImage, editor.bracketImage.name);
    }

    if (!!editor.existingBracketImageUuid) {
      formData.append('existingBracketImageUuid', editor.existingBracketImageUuid);
    }

    if (!!editor.logoImage) {
      formData.append('logoImage', editor.logoImage, editor.logoImage.name);
    }

    if (!!editor.existingLogoImageUuid) {
      formData.append('existingLogoImageUuid', editor.existingLogoImageUuid);
    }

    if (!!editor.tournamentTypeUuid) {
      formData.append('tournamentTypeUuid', editor.tournamentTypeUuid);
    }

    if (!!editor.tournamentResultSubmissionTypeUuid) {
      formData.append('tournamentResultSubmissionTypeUuid', editor.tournamentResultSubmissionTypeUuid);
    }

    if (!!editor.startDate) {
      formData.append('startDate', editor.startDate.toString());
    }

    if (!!editor.tournamentGameUuid) {
      formData.append('tournamentGameUuid', editor.tournamentGameUuid);
    }

    if (!!editor.tournamentModeUuid) {
      formData.append('tournamentModeUuid', editor.tournamentModeUuid);
    }

    if (!!editor.tournamentPlatformUuid) {
      formData.append('tournamentPlatformUuid', editor.tournamentPlatformUuid);
    }

    if (!!editor.twitchChannel) {
      formData.append('twitchChannel', editor.twitchChannel);
    }

    if (!!editor.maximumPlayers) {
      formData.append('maximumPlayers', editor.maximumPlayers.toString());
    }

    if (!!editor.playersPerGame) {
      formData.append('playersPerGame', editor.playersPerGame.toString());
    }

    if (!!editor.timeToPlay) {
      formData.append('timeToPlay', editor.timeToPlay);
    }

    if (!!editor.sponsorImages) {
      editor.sponsorImages.forEach(file => {
        if (!!file) {
          formData.append('sponsorImages', file, file.name);
        }
      });
    }

    if (!!editor.existingSponsorImageUuids) {
      editor.existingSponsorImageUuids.forEach(uuid => {
        if (!!uuid) {
          formData.append('existingSponsorImageUuids', uuid);
        }
      });
    }

    return this.http.post<TournamentEditor>(url, formData, {
      headers: new HttpHeaders().set('enctype', 'multipart/form-data'),
      reportProgress: true,
      observe: 'events'
    });
  }

  listTournaments(queryParams: TournamentQueryRequest): Observable<PaginatedList<TournamentSummary>> {
    const url = `${this.config.apiUrl}tournaments/list`;
    return this.http.post<PaginatedList<TournamentSummary>>(url, queryParams);
  }

  getTournament(uuid: string): Observable<TournamentEditor> {
    const url = `${this.config.apiUrl}tournaments/${uuid}`;
    return this.http.get<TournamentEditor>(url);
  }

  getTournamentSummary(uuid: string): Observable<TournamentSummary> {
    const url = `${this.config.apiUrl}tournaments/${uuid}/summary`;
    return this.http.get<TournamentSummary>(url);
  }

  startTournament(uuid: string): Observable<TournamentSummary> {
    const url = `${this.config.apiUrl}tournaments/${uuid}/start`;
    return this.http.get<TournamentSummary>(url);
  }
}
